import { useEffect, useState } from "react"
import axios from "axios"
import InstructorRoute from "../../../components/routes/InstuctorRoute"
import CourseCreateForm from "../../../components/forms/CourseCreate"
import Resizer from "react-image-file-resizer"
import { useRouter } from "next/router"
import { Box } from "@material-ui/core"
import {
  courseCreate,
  imageDelete,
  imageUpload,
} from "../../../redux/actions/lessonActions"
import { useDispatch, useSelector } from "react-redux"
const CourseCreate = () => {
  // state
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: 0,
    uploading: false,
    paid: false,
    playlistId: "",
    loading: false,
  })
  const [preview, setPreview] = useState("")
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image")
  const dispatch = useDispatch()

  // const uploadImage = useSelector((state) => state.uploadImage)
  // const { loading, error, image } = uploadImage

  // useEffect(() => {}, [image, uploadImage])

  // router
  const router = useRouter()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onDropzoneAreaChange = (files) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      let file = files[0]

      if (file) {
        reader.readAsDataURL(file)
      }
      reader.onload = function () {
        console.log(reader.result)
      }
      reader.onerror = (error) => reject(error)

      if (file) {
        setValues({ ...values, loading: true })
        Resizer.imageFileResizer(
          file,
          500,
          300,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              dispatch(imageUpload(uri))

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

  const handleImageRemove = async () => {
    console.log("image remove", image.Bucket)

    window.confirm("Are you sure you want to delete")
    try {
      // console.log("image", image)
      setValues({ ...values, loading: true })
      const res = await axios.post("/api/course/delete", { image })
      dispatch(imageDelete(image))
      // setImage({})
      // setPreview("")
      setUploadButtonText("Upload Image")
      setValues({ ...values, loading: false })
    } catch (err) {
      console.log(err)
      setValues({ ...values, loading: false })
      console.log("upload failed. Try later")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(courseCreate(image, values))
      console.log("Great! Now you can start adding lessons")
      router.push("/user/instructor/dashboard")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <InstructorRoute>
      <Box mt="1rem">
        <h1 className="jumbotron text-center square">Create Course</h1>

        <div className="pt-3 pb-3">
          <CourseCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            preview={preview}
            uploadButtonText={uploadButtonText}
            loading={loading}
            handleImageRemove={handleImageRemove}
            onDropzoneAreaChange={onDropzoneAreaChange}
          />
        </div>
      </Box>
    </InstructorRoute>
  )
}

export default CourseCreate
