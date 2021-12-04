import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Hero from "../components/layout/Hero"
import axios from "axios"
import CourseCard from "../components/course/CourseCard"
import { Grid, Paper } from "@material-ui/core"
import { Box } from "@mui/system"
import { wrapper } from "../redux/store"
import { publishedCourse } from "../redux/actions/lessonActions"
import { useSelector } from "react-redux"
import { getSession } from "next-auth/react"
import { loadUser } from "../redux/actions/userActions"

const Home = () => {
  const coursePublished = useSelector((state) => state.coursePublished)
  const { loading, error, published } = coursePublished

  const courses = published

  return (
    <div>
      <Paper style={{ marginTop: "0.5rem" }}>
        <Hero
          // imgSrc="/home-hero.jpg"
          // imgAlt="satified woman eating in restaurant"
          title="OpenFreeUni"
          subtitle="Learn for Free!"
        />
      </Paper>
      <Grid container>
        {courses?.map((course) => (
          <Grid item key={course._id} xs={4}>
            <Box
              style={{ padding: "0.5rem", paddingLeft: "0", paddingRight: "0" }}
            >
              <CourseCard course={course} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })

      // const userData = session?.user

      if (!session) await store.dispatch(loadUser(req.headers.cookie, req))

      await store.dispatch(publishedCourse(req))
    }
)

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       const session = await getSession({ req })

//       // console.log(session)

//       // store.dispatch(loadUser(req.headers.cookie, req))

//       if (!session) {
//         return {
//           redirect: {
//             destination: "/user/login",
//             permanent: false,
//           },
//         }
//       }
//     }
// )

export default Home
