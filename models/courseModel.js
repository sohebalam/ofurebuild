import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema

const imageSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
})

// const fileSchema = new mongoose.Schema({
//   title: {
//     type: String,
//   },
//   description: {
//     type: String,
//   },
//   media: {
//     type: String,
//   },
//   name: {
//     type: String,
//   },
//   file_path: {
//     type: String,
//   },
//   file_mimetype: {
//     type: String,
//   },
// })
// const videoSchema = new mongoose.Schema({
//   title: {
//     type: String,
//   },
//   description: {
//     type: String,
//   },
//   media: {
//     type: String,
//   },
//   playlistId: {
//     type: String,
//   },
//   videoId: {
//     type: String,
//   },
//   thumbnailUrl: {
//     type: String,
//   },
//   channelTitle: {
//     type: String,
//   },
// })
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  media: {
    type: String,
  },
  playlistId: {
    type: String,
  },
  videoId: {
    type: String,
  },
  thumbnailUrl: {
    type: String,
  },
  channelTitle: {
    type: String,
  },
  file_path: {
    type: String,
  },
  file_mimetype: {
    type: String,
  },
  name: {
    type: String,
  },
})

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    playlistId: {
      type: String,
      required: true,
    },
    description: {
      type: {},
      minlength: 200,
      required: true,
    },
    price: {
      type: Number,
      default: 9.99,
    },
    images: [imageSchema],
    category: String,
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    // videos: [videoSchema],
    // files: [fileSchema],
    lessons: [lessonSchema],
  },
  { timestamps: true }
)

export default mongoose.models.Course || mongoose.model("Course", courseSchema)
