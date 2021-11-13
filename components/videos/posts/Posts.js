import React from "react"
import { Button } from "@material-ui/core"
import VideoItem from "../VideoItem"
import { selectLesson } from "../../../redux/actions/lessonActions"
import { useDispatch } from "react-redux"

const Posts = ({ posts }) => {
  const dispatch = useDispatch()
  console.log("posts", posts)

  return (
    <div>
      <ul className="list-group mb-4">
        {posts &&
          posts.map((video) => (
            <Button
              key={video.videoId}
              onClick={() => dispatch(selectLesson(video))}
            >
              <VideoItem video={video} />
            </Button>
          ))}
      </ul>
    </div>
  )
}

export default Posts
