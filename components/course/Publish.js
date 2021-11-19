import { CircularProgress, Tooltip } from "@material-ui/core"
import { CheckCircleOutline } from "@material-ui/icons"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { wrapper } from "../../redux/store"
const Publish = ({ initCourse, slug, lessons }) => {
  // const [state, setState] = useState(false)
  const [course, setCourse] = useState(initCourse)
  const [loading, setLoading] = useState(false)

  console.log(course)

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "One you publish your course, it will be live in the marketplace for users to enroll"
      )
      if (!answer) return
      console.log(courseId)
      const { data } = await axios.put(`/api/course/publish/${courseId}`)
      // toast(" course is live")
      console.log(" course is live")
      setCourse(data)
      setLoading(false)
    } catch (error) {
      // toast("Publish failed, course is not live")
    }
  }

  const handleUnpublish = async (e, courseId) => {
    setLoading(true)
    try {
      let answer = window.confirm(
        "One you Un-Publish your course, it will  not be live in the marketplace for users to enroll"
      )
      if (!answer) return
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`)
      // toast(" course is not live")
      console.log(" course is not live")
      setCourse(data)
      setLoading(false)
    } catch (error) {
      // toast("UnPublish failed, course is live")
    }
  }

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {lessons && lessons.length < 5 ? (
            <Tooltip title="Min 5 lessons required to publish">
              <HelpOutlineIcon className="h5 pointer text-danger" />
            </Tooltip>
          ) : course && course?.published ? (
            <Tooltip title="Unpublish">
              <HighlightOffIcon
                // onClick={handlePublish}
                onClick={(e) => handleUnpublish(e, course?._id)}
                className="h5 pointer text-danger"
              />
            </Tooltip>
          ) : (
            <Tooltip title="Publish">
              <CheckCircleOutline
                onClick={(e) => handlePublish(e, course?._id)}
                className="h5 pointer text-success"
              />
            </Tooltip>
          )}
        </div>
      )}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context

    await store.dispatch(getlessons(req.headers.cookie, req, params.slug))
    await store.dispatch(loadCourse(req.headers.cookie, req, params.slug))
  }
)

export default Publish
