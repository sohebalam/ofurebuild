import { useState, useEffect } from "react"
import axios from "axios"
// import InstructorRoute from "../../../components/route/Instructor"
import { Avatar, Button, Grid, Tooltip, Typography } from "@material-ui/core"
import Link from "next/link"
import { useSelector } from "react-redux"
import { wrapper } from "../../../redux/store"
import { loadCourses } from "../../../redux/actions/lessonActions"
import Publish from "../../../components/course/Publish"
import InstructorRoute from "../../../components/routes/InstuctorRoute"
const InstructorIndex = () => {
  const coursesLoad = useSelector((state) => state.coursesLoad)
  const { loading, error, courses } = coursesLoad

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
      {courses &&
        courses.map((course) => (
          <Grid container key={course._id}>
            <Grid item xs={3}>
              <Avatar
                style={{ height: "100px", width: "100px" }}
                src={course?.images ? course.images[0]?.url : "/course.jpg"}
              />
            </Grid>
            <Grid item xs={6}>
              <Link href={`/user/instructor/course/${course.slug}`}>
                <a>
                  {/* <Button style={{ underline: true }}> */}
                  <Typography variant="h5">{course?.title}</Typography>
                  {/* </Button> */}
                </a>
              </Link>
              <p>{course.lessons?.length}</p>
            </Grid>
            <Grid item xs={3}>
              <Publish
                initCourse={course}
                slug={course.slug}
                lessons={course.lessons}
              />
            </Grid>
          </Grid>
        ))}
    </InstructorRoute>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // const session = await getSession({ req })

      await store.dispatch(loadCourses(req.headers.cookie, req))
      // await store.dispatch(getlessons(req.headers.cookie, req, slug))
    }
)

export default InstructorIndex
