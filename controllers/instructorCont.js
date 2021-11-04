import User from "../models/userModel"
import queryString from "query-string"
const stripe = require("stripe")(process.env.STRIPE_SECRET)
import Course from "../models/courseModel"

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
  // console.log(req.user)
  try {
    const user = await User.findById(req.user._id).exec()

    console.log(user.stripe_seller.id)

    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_seller.id,
      { redirect_url: process.env.STRIPE_SETTINGS_REDIRECT }
    )

    // console.log(loginLink)

    res.json(loginLink.url)
  } catch (err) {
    console.log("stripe payout settings login link err => , err")
  }
}

//could be in course too

export const getAccountStatus = async (req, res) => {
  try {
    if (req.user.id) {
      const user = await User.findOne({ socialId: req.user.id })
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

export const currentInstructor = async (req, res) => {
  try {
    if (req.user.id) {
      let user = await User.findById(req.user.id).select("-password").exec()
      if (!user.role.includes("instructor")) {
        return res.sendStatus(403)
      } else {
        res.send(user)
      }
    }

    let user = await User.findById(req.user._id).select("-password").exec()
    // console.log("CURRENT INSTRUCTOR => ", user);
    if (!user.role.includes("instructor")) {
      return res.sendStatus(403)
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
