import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import {
  Avatar,
  Tooltip,
  Button,
  Grid,
  Box,
  makeStyles,
  DialogActions,
  IconButton,
  Alert,
  Typography,
} from "@material-ui/core"
import ReactMarkdown from "react-markdown"
import EditIcon from "@material-ui/icons/Edit"
import PublishIcon from "@material-ui/icons/Publish"
import Dialog from "@material-ui/core/Dialog"
import CloseIcon from "@material-ui/icons/Close"
import GroupIcon from "@mui/icons-material/Group"
import CourseForm from "../../../../components/forms/FileForm"
import { useSelector, useDispatch } from "react-redux"
import { wrapper } from "../../../../redux/store"
import {
  getlessons,
  instructorCourse,
  loadCourse,
} from "../../../../redux/actions/lessonActions"
import Lessons from "../../../../components/file/DragList"
import Publish from "../../../../components/course/Publish"
import { countStudents } from "../../../../redux/actions/lessonActions"
import InstructorRoute from "../../../../components/routes/InstuctorRoute"
import { getSession } from "next-auth/client"
import { loadUser } from "../../../../redux/actions/userActions"

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    left: "95%",
    top: "-9%",
    backgroundColor: "lightgray",
    color: "primary",
  },
  iconColor: {
    color: "green",
  },
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const CourseView = () => {
  const [fileVisible, setFileVisible] = useState(false)

  const [values, setValues] = useState({
    title: "",
    content: "",
    video: "",
  })
  const classes = useStyles()
  const dispatch = useDispatch()
  // const [students, setStudents] = useState(0)

  const router = useRouter()
  const { slug } = router.query

  const courseLoad = useSelector((state) => state.courseLoad)
  const { loading, error: courseError, course } = courseLoad

  // console.log(course?.lessons)

  const studentCount = useSelector((state) => state.studentCount)
  const { students } = studentCount

  useEffect(() => {
    course && dispatch(countStudents(course._id))
    // course && studentCount()
  }, [course])

  return (
    <InstructorRoute>
      <Grid container>
        <>
          {course && (
            <Grid container key={course._id} style={{ marginTop: "2rem" }}>
              <Grid container>
                <Grid item xs={2}>
                  <Avatar
                    style={{ height: "150px", width: "150px" }}
                    src={course.image ? course.image.Location : "/course.jpg"}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h3">{course.title}</Typography>
                  <Typography variant="h4">
                    {course?.lessons && course?.lessons?.length} Lessons
                  </Typography>
                  <Typography variant="h5">{course.category}</Typography>
                  <Box padding="1rem">
                    <Typography variant="h5">
                      <ReactMarkdown children={course.description || ""} />
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box mt="1rem">
                    <Button
                      variant="outlined"
                      fullWidth={true}
                      color="primary"
                      icon={<PublishIcon />}
                      size="large"
                      onClick={() => setFileVisible(true)}
                    >
                      Add File
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                  <div>
                    <Box marginLeft="6rem">
                      <Tooltip
                        title={`${students?.length} Enrolled`}
                        style={{ marginBottom: "0.5rem", marginRight: "1rem" }}
                      >
                        <GroupIcon
                          className="h5 pointer mr-4"
                          className={classes.iconColor}
                        />
                      </Tooltip>

                      <Tooltip title="Edit" style={{ marginRight: "1rem" }}>
                        <EditIcon
                          onClick={() =>
                            router.push(`/user/instructor/course/edit/${slug}`)
                          }
                          className="h5 pointer text-warning mr-4"
                        />
                      </Tooltip>

                      <Publish
                        initCourse={course}
                        lessons={course.lessons}
                        slug={slug}
                      />
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Dialog
            open={fileVisible}
            onClose={() => setFileVisible(false)}
            footer={null}
            classes={{ paper: classes.paper }}
          >
            <CourseForm slug={slug} />
            <DialogActions>
              <IconButton
                autoFocus
                onClick={() => setFileVisible(false)}
                color="primary"
                className={classes.customizedButton}
              >
                <CloseIcon />
              </IconButton>
            </DialogActions>
          </Dialog>
        </>
      </Grid>
      <Grid container style={{ marginTop: "0.5rem" }}>
        <Lessons slug={slug} lessons={course.lessons} />
      </Grid>
    </InstructorRoute>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const { params, req } = context

//     const { slug } = params

//     // const slug = "fdzsf"

//     // await store.dispatch(getSingleCourse(req.headers.cookie, req, params.slug))
//     await store.dispatch(instructorCourse(req.headers.cookie, req, slug))
//     await store.dispatch(loadCourse(req.headers.cookie, req, params.slug))
//   }
// )

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context
    const session = await getSession({ req })

    // console.log(session.user.role)

    await store.dispatch(loadUser(req.headers.cookie, req))
    await store.dispatch(instructorCourse(req.headers.cookie, req, params.slug))
    await store.dispatch(loadCourse(req.headers.cookie, req, params.slug))

    if (!session || !session.user.role.includes("instructor")) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  }
)

export default CourseView
