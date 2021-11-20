import { Grid } from "@material-ui/core"
import VideoDetail from "../../../components/videos/VideoDetail"
import { useEffect, useState } from "react"
import VideoList from "../../../components/videos/VideoList"
import {
  getlessons,
  getSingleCourse,
  getStudentCourses,
  loadCourse,
} from "../../../redux/actions/lessonActions"
import { wrapper } from "../../../redux/store"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { Box } from "@mui/system"
import { loadUser } from "../../../redux/actions/userActions"
import { getSession } from "next-auth/client"
// const YOUTUBE_PLAYLIST_ITEMS_API =
//   "https://www.googleapis.com/youtube/v3/playlistItems"

// const playlistId = "PL25nRqESo6qH6t-8NcPRE20XSThI2JgTa"

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const { params, req } = context

//     // console.log("params", params)

//     // await store.dispatch(getlessons(req.headers.cookie, req, params.slug))
//     await store.dispatch(loadCourse(req.headers.cookie, req, params.slug))
//     // await store.dispatch(getSingleCourse(req, params.slug))
//   }
// )

const Index = () => {
  const [selectedVideo] = useState({})
  const singleCourse = useSelector((state) => state.singleCourse)
  const { loading, error: courseError, course } = singleCourse

  console.log(course)

  const videos = course?.lessons

  // const { items } = data

  useEffect(() => {
    // setVideos(items)
  }, [])

  return (
    <Box style={{ marginBottom: "11rem" }}>
      <Grid
        container
        justifyContent="center"
        style={{ marginBottom: "1rem", marginTop: "0.75rem" }}
      >
        <Grid item xs={8}>
          <VideoDetail />
        </Grid>
        <Grid item xs={4}>
          <VideoList videos={videos} />
        </Grid>
      </Grid>
    </Box>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context
    const session = await getSession({ req })

    store.dispatch(loadUser(req.headers.cookie, req))
    await store.dispatch(
      getStudentCourses(req.headers.cookie, req, params.slug)
    )

    if (!session || !session.user.role.includes("user")) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  }
)

export default Index
