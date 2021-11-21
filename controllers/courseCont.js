// import AWS from "aws-sdk"
import { nanoid } from "nanoid"
import Course from "../models/courseModel"
import slugify from "slugify"
import { readFileSync } from "fs"
import User from "../models/userModel"
import cloudinary from "../utils/cloudinary"

export const myCourses = async (req, res) => {
  const user = await User.findById(req.user._id).exec()

  let coursesArray = []

  for (let i = 0; i < user?.courses.length; i++) {
    const result = await Course.findById(user?.courses[i].toString()).exec()

    coursesArray.push(result)
  }
  res.send(coursesArray)
}

export const update = async (req, res) => {
  // console.log(req.body.images[0].public_id)

  try {
    const { slug } = req.query
    // console.log(slug)

    const course = await Course.findOne({ slug }).exec()

    if (req.user._id != course.instructor) {
      return res.status(400).json({ message: "Unathorized" })
    }

    await cloudinary.uploader.destroy(req.body.images[0].public_id)
    const fileStr = req.body.image
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "ofu",
    })

    let imagesLinks = []

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })

    req.body.images = imagesLinks

    const updated = await Course.findOneAndUpdate({ slug }, req.body, {
      new: true,
    }).exec()

    res.json(updated)
  } catch (error) {
    console.log(error)
    return res.status(400).send(error.message)
  }
}

export const uploadImage = async (req, res) => {
  // console.log(req.body.image)

  // return

  const fileStr = req.body.image
  const result = await cloudinary.uploader.upload(fileStr, {
    folder: "ofu",
  })
  // console.log(result)

  //   console.log(result)

  let imagesLinks = []

  imagesLinks.push({
    public_id: result.public_id,
    url: result.secure_url,
  })

  req.body.images = imagesLinks

  // console.log(req.body.images)

  const course = await Course.create(req.body)

  console.log(course)

  res.status(200).json({
    success: true,
    course,
  })
}

export const create = async (req, res) => {
  if (req.body.paid === true && req.body.price === 0) {
    req.body.price = 9.99
  }

  const fileStr = req.body.image
  const result = await cloudinary.uploader.upload(fileStr, {
    folder: "ofu",
  })
  const alreadyExist = await Course.findOne({
    slug: slugify(req.body.title.toLowerCase()),
  })
  if (alreadyExist) return res.status(400).send("Title is taken")

  let imagesLinks = []

  imagesLinks.push({
    public_id: result.public_id,
    url: result.secure_url,
  })

  req.body.images = imagesLinks

  const course = await new Course({
    slug: slugify(req.body.title),
    instructor: req.user._id,
    ...req.body,
  }).save()

  await youtube(course)

  res.status(200).json({
    success: true,
    course,
  })
}

const youtube = async (course) => {
  // console.log("xfcvfdzxhere")
  // const { slug } = req.query

  // const { playlistId } = req.body

  // console.log("youtube", slug)

  try {
    const YOUTUBE_PLAYLIST_ITEMS_API =
      "https://www.googleapis.com/youtube/v3/playlistItems"

    // const course = await Course.findOne({ slug: slug })
    //   .populate("instructor", "_id name")
    //   .exec()

    const playlistId = course?.playlistId
    console.log(playlistId)

    const response = await fetch(
      `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`
    )

    // console.log("coursezds", course)

    const data = await response?.json()

    const videos = data.items?.map((item) => ({
      playlistId: item.snippet.playlistId,
      videoId: item.snippet.resourceId.videoId,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
    }))

    // console.log("newyoutube", slug)

    const newList = await Course.findByIdAndUpdate(
      { _id: course?._id },

      { $addToSet: { lessons: videos } }
    )
    // console.log("newlist", newList)
    return newList
  } catch (error) {
    console.log(error)
  }
}

export const instructorCourses = async (req, res) => {
  // console.log(req.method, req.user)

  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec()
    res.status(200).json(courses)
  } catch (err) {
    console.log(err)
  }
}

export const readCourse = async (req, res) => {
  console.log(req.method)
  const { slug } = req.query

  try {
    const course = await Course.findOne({ slug: slug })
      .populate("instructor", "_id name")
      .exec()

    // const ytList = await YTList.findOne({
    //   slug: slug,
    // })

    // const courseList = [course, ytList]

    res.send(course)
  } catch (error) {
    console.log(error)
  }
}
export const singleCourse = async (req, res) => {
  const { slug } = req.query
  // console.log(req.method)

  try {
    const course = await Course.findOne({ slug: slug })
      .populate("instructor", "_id name")
      .exec()

    // console.log(course)

    res.send(course)
  } catch (error) {
    console.log(error)
  }
}

export const addLesson = async (req, res) => {
  try {
    const { slug, instructorId } = req.query
    const { title, content, video } = req.body
    // console.log(req.query)
    // console.log(req.body)

    if (req.user._id != instructorId) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        $push: { lessons: { title, content, video, slug: slugify(title) } },
      },
      { new: true }
    )
      .populate("instructor", "_id name")
      .exec()

    res.json(updated)
  } catch (error) {
    console.log(error)
    return res.status(400).send("add lesson failed")
  }
}

export const removeLesson = async (req, res) => {
  try {
    const { slug, lessonId } = req.query
    console.log(lessonId)

    const course = await Course.findOne({ slug }).exec()
    if (req.user._id != course.instructor) {
      return res.status(400).send("Unauthorized")
    }

    const deletedlesson = await Course.findByIdAndUpdate(course._id, {
      $pull: { lessons: { _id: lessonId } },
    }).exec()

    res.json({ ok: true, deletedlesson })
  } catch (error) {
    console.log(error)
  }
}

export const updateLesson = async (req, res) => {
  // console.log(req.query, req.body)
  // return
  try {
    const { slug } = req.query
    console.log(slug)
    const { title, _id, content, video, free_preview } = req.body

    const course = await Course.findOne({ slug }).select("instructor").exec()
    console.log(course.instructor._id, title, _id, content, video, free_preview)

    if (req.user._id != course.instructor._id) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const updated = await Course.updateOne(
      { "lessons._id": _id },
      {
        $set: {
          "lessons.$.title": title,
          "lessons.$.content": content,
          "lessons.$.video": video,
          "lessons.$.free_preview": free_preview,
        },
      },
      { new: true }
    ).exec()
    console.log("update", updated)
    res.json({ ok: true })
  } catch (error) {
    console.log(error)

    return res.status(400).send("Update lessons failed")
  }
}

export const publishCourse = async (req, res) => {
  console.log(req.method)

  try {
    const { courseId } = req.query
    const course = await Course.findById(courseId).select("instructor").exec()
    if (req.user._id != course.instructor._id) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: true },
      { new: true }
    ).exec()

    res.json(updated)
  } catch (error) {
    console.log(error)
    return res.status(400).send("Publish course failed")
  }
}

export const unpublishCourse = async (req, res) => {
  try {
    const { courseId } = req.query
    const course = await Course.findById(courseId).select("instructor").exec()
    if (req.user._id != course.instructor._id) {
      return res.status(400).json({ message: "Unathorized" })
    }
    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: false },
      { new: true }
    ).exec()

    res.json(updated)
  } catch (error) {
    console.log(error)
    return res.status(400).send("Un-ublish course failed")
  }
}

export const courses = async (req, res) => {
  try {
    const all = await Course.find({ published: true })
      .populate("instructor", "_id name")
      .exec()
    res.json(all)
  } catch (error) {}
}

export const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.query

    const user = await User.findById(req.user._id).exec()

    let ids = []
    let length = user.courses && user.courses.length

    for (let i = 0; i < length; i++) {
      ids.push(user.courses[i].toString())
    }

    res.json({
      status: ids.includes(courseId),
      course: await Course.findById(courseId).exec(),
    })
  } catch (error) {
    console.log(error)
  }
}

export const freeEnrollment = async (req, res) => {
  try {
    const course = await Course.findById(req.query.courseId).exec()
    if (course.paid) return
    const result = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { courses: course._id },
      },
      { new: true }
    ).exec()
    res.json({ message: "You have enrolled", course: course })
  } catch (error) {
    console.log(error)
    return res.status(400).send("Enrollment create failed")
  }
}

export const userCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec()
    const courses = await Course.find({ _id: { $in: user.courses } })
      .populate("instructor", "_id name")
      .exec()
    res.json(courses)
  } catch (error) {
    console.log(error)
  }
}

export const markCompleted = async (req, res) => {
  const { courseId, lessonId } = req.body
  // console.log(courseId, lessonId)

  // find if user with that course is already created
  const existing = await Completed.findOne({
    user: req.user._id,
    course: courseId,
  }).exec()

  if (existing) {
    // update
    const updated = await Completed.findOneAndUpdate(
      {
        user: req.user._id,
        course: courseId,
      },
      {
        $addToSet: { lessons: lessonId },
      }
    ).exec()
    res.json({ ok: true })
  } else {
    // create
    const created = await new Completed({
      user: req.user._id,
      course: courseId,
      lessons: lessonId,
    }).save()
    res.json({ ok: true })
  }
}

export const listCompleted = async (req, res) => {
  try {
    const list = await Completed.findOne({
      user: req.user._id,
      course: req.body.courseId,
    }).exec()
    list && res.json(list.lessons)
  } catch (err) {
    console.log(err)
  }
}

export const markIncomplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body

    const updated = await Completed.findOneAndUpdate(
      {
        user: req.user._id,
        course: courseId,
      },
      {
        $pull: { lessons: lessonId },
      }
    ).exec()
    res.json({ ok: true })
  } catch (err) {
    console.log(err)
  }
}
