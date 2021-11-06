import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  media: {
    type: String,
  },
  name: {
    type: String,
  },
  file_path: {
    type: String,
  },
  file_mimetype: {
    type: String,
  },
})
const videoSchema = new mongoose.Schema({
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
})
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

const ytListSchema = new mongoose.Schema(
  {
    slug: { type: String },
    videos: [videoSchema],
    files: [fileSchema],
    lessons: [lessonSchema],
  },

  { timestamps: true }
)

export default mongoose.models.ytList || mongoose.model("ytList", ytListSchema)
