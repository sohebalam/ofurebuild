import {
  Grid,
  Avatar,
  ListItem,
  ListItemAvatar,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
// import { List } from "antd"
import { getlessons } from "../../redux/actions/lessonActions"
import { wrapper } from "../../redux/store"

const useStyles = makeStyles((theme) => ({
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const SingleCourseLesson = ({ lessons }) => {
  // const lessonsList = useSelector((state) => state.lessonsList)
  // const { loading: loadingList, error: errorList, lessons } = lessonsList

  console.log(lessons)
  const classes = useStyles()
  return (
    <Grid container>
      {lessons ? (
        <h4>{lessons?.lessons?.length} Lessons</h4>
      ) : (
        <h4>{lessons?.videos?.length} Lessons</h4>
      )}
      <Grid container>
        {lessons
          ? lessons?.map((lesson, index) => (
              <Grid container key={lesson._id}>
                <Grid item xs={3} style={{ marginTop: "0.5rem" }}>
                  <Avatar>{index + 1}</Avatar>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">{lesson.title}</Typography>
                </Grid>
              </Grid>
            ))
          : lessons?.vidoes?.map((lesson, index) => (
              <Grid container key={lesson._id}>
                <Grid item xs={3}>
                  <Avatar>{index + 1}</Avatar>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">{lesson.title}</Typography>
                </Grid>
              </Grid>
            ))}
      </Grid>
    </Grid>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const { params, req } = context

//     await store.dispatch(getlessons(req.headers.cookie, req, params.slug))
//   }
// )

export default SingleCourseLesson
