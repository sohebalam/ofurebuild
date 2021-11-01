import { Grid } from "@material-ui/core"
import VideoDetail from "../../../components/videos/VideoDetail"
import { useEffect, useState } from "react"
import VideoList from "../../../components/videos/VideoList"
import { getSingleCourse } from "../../../redux/actions/lessonActions"
import { wrapper } from "../../../redux/store"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
// const YOUTUBE_PLAYLIST_ITEMS_API =
//   "https://www.googleapis.com/youtube/v3/playlistItems"

// const playlistId = "PL25nRqESo6qH6t-8NcPRE20XSThI2JgTa"

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context

    // console.log("params", params)

    // const slug = "fdzsf"

    await store.dispatch(getSingleCourse(req, params.slug))
  }
)

const Index = () => {
  // const [videos, setVideos] = useState([])
  // const [onSelectedVideo, setOnSelectedVideo] = useState({})
  const [selectedVideo] = useState({})

  const singleCourse = useSelector((state) => state.singleCourse)
  const { loading, error: courseError, course } = singleCourse

  console.log(course)

  const videos = course.videos

  console.log("viasdadsasd", videos)
  console.log(selectedVideo)

  // const { items } = data

  useEffect(() => {
    // setVideos(items)
  }, [])

  return (
    <Grid
      container
      justifyContent="center"
      style={{ marginBottom: "12rem", marginTop: "0.75rem" }}
    >
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            {/* <SearchBar onSubmit={handleSubmit} /> */}
            {/* input field */}
          </Grid>
          <Grid item xs={8}>
            <VideoDetail />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Index
