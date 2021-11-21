import React, { useEffect, useState } from "react"
import UpdateCourse from "../../../../../components/forms/UpdateCourse"
import Resizer from "react-image-file-resizer"
import axios from "axios"
import { useRouter } from "next/router"
// import { List } from "@material-ui/icons"
import {
  makeStyles,
  CardContent,
  Avatar,
  Grid,
  Box,
  Card,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  List,
} from "@material-ui/core"

import {
  courseEdit,
  getlessons,
  imageDelete,
  imageUpload,
  loadCourse,
} from "../../../../../redux/actions/lessonActions"
import { useDispatch, useSelector } from "react-redux"
import { wrapper } from "../../../../../redux/store"
import { getSession } from "next-auth/client"
import { loadUser } from "../../../../../redux/actions/userActions"

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
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const EditCourse = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: 0,
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
  })

  const [image, setImage] = useState("")
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video")
  const dispatch = useDispatch()

  const [files, setFiles] = useState({})

  const handleChange = (e) => {
    // e.preventDefault()
    // console.log(e)
    setValues({ ...values, [e.target.name]: e.target.value })

    // console.log(values[0].title)
  }

  const courseLoad = useSelector((state) => state.courseLoad)
  const { loading, error, course } = courseLoad
  const router = useRouter()

  const { slug } = router.query

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true })

      dispatch(imageDelete(values.image))

      setUploadButtonText("Upload Image")
      setValues({ ...values, loading: false })
    } catch (err) {
      console.log(err)
      setValues({ ...values, loading: false })
      // toast("Image upload failed. Try later.")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(image)

    console.log(values, image)
    try {
      var strNum = values.price
      strNum = strNum.toString().replace("£", "")

      values.price = parseFloat(strNum)

      dispatch(courseEdit(image, values, slug))
      console.log("here", data)
    } catch (err) {}
  }

  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete?")
    if (!answer) return
    let allLessons = values.lessons
    const removed = allLessons.splice(index, 1)
    setValues({ ...values, lessons: allLessons })
    const { data } = await axios.delete(`/api/lesson/${slug}`)
    console.log("lessondeleted", data)
  }

  const onDropzoneArea = (files) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      let file = files[0]

      if (file) {
        reader.readAsDataURL(file)
      }
      reader.onload = function () {
        // console.log(reader.result)
      }
      reader.onerror = (error) => reject(error)

      if (file) {
        setValues({ ...values, loading: true })
        Resizer?.imageFileResizer(
          file,
          500,
          300,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              setImage(uri)

              setValues({ ...values, loading: false })
            } catch (err) {
              console.log(err)
              setValues({ ...values, loading: false })
              console.log("upload failed. Try later")
            }
          }
        )
      }
    })

  const classes = useStyles()

  return (
    <>
      {values && (
        <>
          <div>
            <UpdateCourse
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              // handleImage={handleImage}
              // handleImageRemove={handleImageRemove}
              handleSubmit={handleSubmit}
              onDropzoneArea={onDropzoneArea}
              slug={slug}
              course={course}
            />
          </div>
        </>
      )}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context
    const session = await getSession({ req })

    await store.dispatch(loadUser(req.headers.cookie, req))
    await store.dispatch(loadCourse(req.headers.cookie, req, params.slug))

    if (!session || !session?.user.role.includes("instructor")) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  }
)

export default EditCourse
