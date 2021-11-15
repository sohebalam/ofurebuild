import { useState, useEffect } from "react"
import axios from "axios"
import { currencyFormatter } from "../../utils/currency"
// import { Badge } from "antd"
// import ReactPlayer from "react-player"
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Paper,
  Button,
  Badge,
  CircularProgress,
} from "@material-ui/core"
import Image from "next/image"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { useSelector, useDispatch } from "react-redux"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "0.5rem",
    background:
      "linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "inherit",
  },
}))

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  setPreview,
  preview,
  loading,
  user,
  handelPaidEnroll,
  handelFreeEnroll,
  lessons,
}) => {
  const {
    title,
    description,
    instructor,
    updatedAt,

    image,
    price,
    paid,
    category,
  } = course
  const dispatch = useDispatch()
  const enrollmentCheck = useSelector((state) => state.enrollmentCheck)
  const { loading: enrollLoad, error: enrollError, enrolled } = enrollmentCheck

  useEffect(() => {
    if (user && course) dispatch(checkEnrollment())
  }, [])

  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <div>
        <Grid container style={{ padding: "2rem" }}>
          <Grid item xs={8}>
            <Typography
              variant="h1"
              align="center"
              gutterBottom
              sx={{
                color: "secondary.main",
                fontWeight: 400,
              }}
            >
              {title}
            </Typography>
            <Box padding="1rem">
              <Typography variant="body1">
                {description && description.substring(0, 160)}...
              </Typography>
              <Badge
                count={category}
                style={{ backgroundColor: "#03a9f4" }}
                className="pb-4 mr-2"
              />
              <Typography variant="body1">
                Created by {instructor?.name}
              </Typography>
              <Typography variant="body1">
                Last updated {new Date(updatedAt).toLocaleString()}
              </Typography>
              <Typography variant="h4">
                {paid
                  ? currencyFormatter({ amount: price, currency: "gbp" })
                  : "Free"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location)
                setShowModal(!showModal)
              }}
            >
              {/* <h1>image</h1> */}
            </div>

            <div>
              <Image
                src={(course && course?.images[0].url) || "/course.jpg"}
                alt={title}
                height={250}
                width={400}
              />
            </div>

            {loading ? (
              <div className="d-flex justify-contect-center">
                <CircularProgress className="h1 text-danger" />
              </div>
            ) : (
              <Button
                variant="outlined"
                className="mb-3 mt-4"
                type="danger"
                fullWidth
                disabled={loading}
                onClick={paid ? handelPaidEnroll : handelFreeEnroll}
              >
                <CheckCircleOutlineIcon style={{ marginRight: "0.5rem" }} />
                {user
                  ? enrolled?.status
                    ? "Go to course"
                    : "Enroll"
                  : "Login to Enroll"}
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

export default SingleCourseJumbotron
