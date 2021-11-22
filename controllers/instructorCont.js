import User from "../models/userModel"
import queryString from "query-string"

import Course from "../models/courseModel"

const stripe = require("stripe")(process.env.STRIPE_SECRET)

export const studentCount = async (req, res) => {
  try {
    const users = await User.find({ courses: req.body.courseId })
      .select("_id")
      .exec()
    res.json(users)
  } catch (err) {
    console.log(err)
  }
}

export const instructorBalance = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).exec()
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    })
    res.json(balance)
  } catch (err) {
    console.log(err)
  }
}

export const instructorPayoutSettings = async (req, res) => {
  console.log(req.user)
  try {
    const user = await User.findById(req.user._id).exec()

    console.log(user.stripe_seller.id)

    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_seller.id,
      { redirect_url: process.env.STRIPE_SETTINGS_REDIRECT }
    )

    // console.log(loginLink)

    res.send(loginLink.url)
  } catch (err) {
    console.log("stripe payout settings login link err => , err")
  }
}

//could be in course too

export const currentInstructor = async (req, res) => {
  try {
    if (req.user.id) {
      let user = await User.findById(req.user.id).select("-password").exec()
      if (!user.role.includes("instructor")) {
        return res.status(403)
      } else {
        res.send(user)
      }
    }

    let user = await User.findById(req.user._id).select("-password").exec()
    // console.log("CURRENT INSTRUCTOR => ", user);
    if (!user.role.includes("instructor")) {
      return res.status(403)
    } else {
      res.send(user)
    }
  } catch (err) {
    console.log(err)
  }
}

export const instructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec()
    res.json(courses)
  } catch (err) {
    console.log(err)
  }
}

export const getAccountStatus = async (req, res) => {
  try {
    if (req.user.id) {
      const user = await User.findOne({ socialId: req.user.id })
      // console.log(user)
      const account = await stripe.accounts.retrieve(user.stripe_account_id)
      // console.log("ACCOUNT => ", account);
      if (!account.charges_enabled) {
        return res.staus(401).send("Unauthorized")
      } else {
        const statusUpdated = await User.findByIdAndUpdate(
          user._id,
          {
            stripe_seller: account,
            $addToSet: { role: "instructor" },
          },
          { new: true }
        )
          .select("-password")
          .exec()
        res.json(statusUpdated)
      }
    }
    const user = await User.findById(req.user._id).exec()

    console.log(user)
    const account = await stripe.accounts.retrieve(user.stripe_account_id)
    // console.log("ACCOUNT => ", account);
    if (!account.charges_enabled) {
      return res.staus(401).send("Unauthorized")
    } else {
      const statusUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
          $addToSet: { role: "instructor" },
        },
        { new: true }
      )
        .select("-password")
        .exec()
      res.json(statusUpdated)
    }
  } catch (err) {
    console.log(err)
  }
}

export const paidEnrollment = async (req, res) => {
  try {
    // check if course is free or paid
    const course = await Course.findById(req.query.courseId)
      .populate("instructor")
      .exec()
    if (!course.paid) return
    // application fee 30%
    const fee = (course.price * 30) / 100

    // console.log(course.instructor.stripe_account_id)

    // create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // purchase details
      line_items: [
        {
          name: course.title,
          amount: Math.round(course.price.toFixed(2) * 100),
          currency: "gbp",
          quantity: 1,
        },
      ],
      // charge buyer and transfer remaining balance to seller (after fee)

      payment_intent_data: {
        application_fee_amount: Math.round(fee.toFixed(2) * 100),
        transfer_data: {
          destination: course.instructor.stripe_account_id,
        },
      },
      // redirect url after successful payment
      success_url: `${process.env.STRIPE_SUCCESS_URL}/${course._id}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })
    // console.log("SESSION ID => ", session)

    await User.findByIdAndUpdate(req.user._id, {
      stripeSession: session,
    }).exec()
    res.send(session.id)
  } catch (err) {
    console.log("PAID ENROLLMENT ERR", err)
    return res.status(400).send("Enrollment create failed")
  }
}

export const stripeSuccess = async (req, res) => {
  // console.log(req.method, req.user, req.query.id)

  try {
    const course = await Course.findById(req.query.id).exec()
    const user = await User.findById(req.user._id).exec()

    if (!user.stripeSession.id) return res.sendStatus(400)

    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    )
    console.log("Stripe success", session)
    if (session.payment_status === "paid") {
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { courses: course._id },
        $set: { stripeSession: {} },
      }).exec()
      res.json({ success: true, course })
    }
    // res.send(session.id)
  } catch (error) {
    console.log("stipe error", error)
  }
}

export const newInstructor = async (req, res) => {
  try {
    if (req.user.id) {
      const user = await User.findOne({ socialId: req.user.id })

      req.user._id = user._id
    }
    // console.log(req.method)
    // 1. find user from db
    const user = await User.findById(req.user._id).exec()
    // console.log(user)
    // 2. if user dont have stripe_account_id yet, then create new
    if (!user.stripe_account_id) {
      // const account = await stripe.accounts.create({ type: "standard" })
      const account = await stripe.accounts.create({ type: "express" })
      // console.log("ACCOUNT => ", account.id)
      user.stripe_account_id = account.id
      user.save()
    }
    // 3. create account link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL,
      return_url: process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    })
    // console.log(accountLink)
    // 4. pre-fill any info such as email (optional), then send url resposne to frontend
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    })
    // 5. then send the account link as response to fronend
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`)
  } catch (err) {
    console.log("MAKE INSTRUCTOR ERR ", err)
  }
}

export const AccountStatus = async (req, res) => {
  try {
    console.log(req.user._id)

    const user = await User.findById(req.user._id).exec()

    console.log(user)
    const account = await stripe.accounts.retrieve(user.stripe_account_id)
    // console.log("ACCOUNT => ", account)
    if (!account.charges_enabled) {
      return res.staus(401).send("Unauthorized")
    } else {
      const statusUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
          role: "instructor",
        },
        { new: true }
      )
        .select("-password")
        .exec()
      res.json(statusUpdated)
    }
  } catch (err) {
    console.log(err)
  }
}
