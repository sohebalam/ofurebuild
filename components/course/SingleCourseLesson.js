import {
  Grid,
  Avatar,
  ListItem,
  ListItemAvatar,
  makeStyles,
  Button,
  List,
} from "@material-ui/core"
import { Box } from "@mui/system"

const useStyles = makeStyles((theme) => ({
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const SingleCourseLesson = (
  {
    // lessons,
    // setPreview,
    // showModal,
    // setShowModal,
  }
) => {
  const classes = useStyles()
  return (
    <Grid container>
      <hr />
      <Grid item>
        <Box>
          {/* {lessons && <h4>{lessons.length} Lessons</h4>} */}
          <hr />
        </Box>
      </Grid>
    </Grid>
  )
}

export default SingleCourseLesson
