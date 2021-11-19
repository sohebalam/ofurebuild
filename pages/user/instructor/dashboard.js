import { useState, useEffect } from "react"
import axios from "axios"
// import InstructorRoute from "../../../components/route/Instructor"
import { Avatar, Button, Grid, Tooltip, Typography } from "@material-ui/core"
import Link from "next/link"
import { CheckCircleOutlined } from "@material-ui/icons"
import CancelIcon from "@material-ui/icons/Cancel"
import { useSelector } from "react-redux"
import { wrapper } from "../../../redux/store"
import { loadCourses } from "../../../redux/actions/lessonActions"
import { getSession } from "next-auth/client"
import Publish from "../../../components/course/Publish"
const InstructorIndex = () => {
  const coursesLoad = useSelector((state) => state.coursesLoad)
  const { loading, error, courses } = coursesLoad

  return (
    <>
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
                  <Typography variant="h5">{course.title}</Typography>
                  {/* </Button> */}
                </a>
              </Link>
              <p>{course.lessons?.length}</p>
            </Grid>
            <Grid item xs={3}>
              <Publish course={course} slug={course.slug} />
              {/* {course.lessons?.length < 5 ? (
                <p>At least 5 lessons are required to publish a course</p>
              ) : course.published ? (
                <p>Your course is live in the marketplace</p>
              ) : (
                <p>Your course is ready to be published</p>
              )}

              {course.published ? (
                <Tooltip title="Published">
                  <CheckCircleOutlined className="h5 pointer text-success" />
                </Tooltip>
              ) : (
                <Tooltip title="Not Published">
                  <CancelIcon className="h5 pointer text-warning" />
                </Tooltip>
              )} */}
            </Grid>
          </Grid>
        ))}
    </>
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
