import Course from "../models/courseModel"
import cloudinary from "../utils/cloudinary"

export const uploadImage = async (req, res) => {
  const fileStr = req.body.images
  const result = await cloudinary.uploader.upload(fileStr, {
    folder: "ofu",
  })
  console.log(result)

  //   console.log(result)

  let imagesLinks = []

  imagesLinks.push({
    public_id: result.public_id,
    url: result.secure_url,
  })

  console.log("imageLinks", imagesLinks)
  req.body.images = imagesLinks

  console.log(req.body.images)

  const course = await Course.create(req.body)

  res.status(200).json({
    success: true,
    course,
  })
}
export const imageDelete = async (req, res) => {
  // Find user by id

  let course = await Course.findById({ _id: req.query.id })

  console.log(course.images[0]._id)
  console.log(course.images[0].public_id)

  // let course = await Course.findById(req.query._id)
  // Delete image from cloudinary
  console.log("cloud")
  await cloudinary.uploader.destroy(course.images[0].public_id)
  // Delete user from db
  await course.remove({ _id: course.images[0]._id })
  res.json(course)

  return
}
// export const imageUpdate = async (req, res) => {
//   console.log(req.body.title)

//   let course = await Course.findById({ _id: req.query.id })

//   course.title = req.body.title

//   console.log(course.images[0]._id)
//   console.log(course.images[0].public_id)

//   console.log("cloud")
//   res.json(course)

//   return
// }
export const imageUpdate = async (req, res) => {
  // console.log(req.body.data)

  const fileStr = req.body.data

  const result = await cloudinary.uploader.upload(fileStr, {
    folder: "ofu",
  })
  console.log(result)

  //   console.log(result)

  let imagesLinks = []

  imagesLinks.push({
    public_id: result.public_id,
    url: result.secure_url,
  })

  console.log("imageLinks", imagesLinks)
  req.body.images = imagesLinks

  console.log(req.body.images)

  const course = await Course.updateOne(
    { _id: req.query.id },
    // { "images.$.images": req.body }
    {
      $addToSet: {
        images: req.body.images,
      },
    }
  )

  // const course = await Course.findById({ _id: req.query.id })

  // // await course.images.create(req.body)

  // await course.images.insert(req.body.images)

  // var course.images = req.body.images

  res.status(200).json({
    success: true,
    course,
  })
}

export const getImages = async (req, res) => {
  // const { resources } = await cloudinary.search
  //   .expression("folder:ofu")
  //   .sort_by("public_id", "desc")
  //   .max_results(30)
  //   .execute()

  // const publicIds = resources.map((file) => file.public_id)
  // res.send(publicIds)

  const courses = await Course.find()
  res.send(courses)
}

export const deleteNestedArray = async (req, res) => {
  const id = req.query.id

  const course = await Course.updateOne(
    {
      "images._id": id,
    },
    {
      $pull: {
        images: { _id: id },
      },
    }
  )

  if (course) {
    res.send("Successful")
  } else {
    res.status(500).send("Not successful")
  }
}
