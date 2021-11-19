import React from "react"
import { Button } from "@material-ui/core"
import VideoItem from "../VideoItem"
import { selectLesson } from "../../../redux/actions/lessonActions"
import { useDispatch } from "react-redux"
import { Box } from "@mui/system"

const Posts = ({ posts }) => {
  const dispatch = useDispatch()
  // console.log("posts", posts)

  return (
    <>
      <Box style={{ padding: "1rem" }}>
        {posts &&
          posts.map((video) => <VideoItem video={video} key={video.videoId} />)}
      </Box>
    </>
  )
}

export default Posts
