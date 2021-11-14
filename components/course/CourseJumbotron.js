import { useState, useEffect } from "react"
import axios from "axios"
import { currencyFormatter } from "../../utils/currency"
// import { Badge } from "antd"
// import ReactPlayer from "react-player"
import {
  CircularProgress,
  Grid,
  Box,
  Typography,
  makeStyles,
  Paper,
  Button,
} from "@material-ui/core"
import Image from "next/image"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { useSelector } from "react-redux"
import Badge from "@mui/material/Badge"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const CourseJumbotron = (
  {
    // course,
    // showModal,
    // setShowModal,
    // setPreview,
    // preview,
    // loading,
    // user,
    // handelPaidEnroll,
    // handelFreeEnroll,
  }
) => {
  // const {
  //   title,
  //   description,
  //   instructor,
  //   updatedAt,
  //   lessons,
  //   image,
  //   price,
  //   paid,
  //   category,
  // } = course

  const enrollmentCheck = useSelector((state) => state.enrollmentCheck)
  const { loading: enrollLoad, error: enrollError, enrolled } = enrollmentCheck

  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <div>{/*  */}</div>
    </Paper>
  )
}

export default CourseJumbotron
