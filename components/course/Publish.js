import { Tooltip } from "@material-ui/core"
import { CheckCircleOutline } from "@material-ui/icons"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { getlessons, lessonsGet } from "../../redux/actions/lessonActions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { wrapper } from "../../redux/store"
const Publish = ({ course, slug }) => {
  const lessonsList = useSelector((state) => state.lessonsList)
  const { loading: loadingList, error: errorList, lessons } = lessonsList
  // console.log(course, slug, lessons)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(lessonsGet(slug))
  }, [])

  // console.log(course, lessons)

  return (
    <div>
      {/* {courses &&
        course?.map((lesson) =>
          lesson.length > 5 ? (
            <Tooltip title="Unpublish" key={lesson.videoId}>
              <HighlightOffIcon
                // onClick={handlePublish}
                // onClick={(e) => handleUnpublish(e, course._id)}
                className="h5 pointer text-danger"
              />
            </Tooltip>
          ) : (
            <Tooltip
              title="Min 5 lessons required to publish"
              key={lesson.videoId}
            >
              <HelpOutlineIcon className="h5 pointer text-danger" />
            </Tooltip>
          )
        )} */}

      {/* {lessons?.lessons && lessons?.lessons.length < 5 ? (
        <Tooltip title="Min 5 lessons required to publish">
          <HelpOutlineIcon className="h5 pointer text-danger" />
        </Tooltip>
      ) : course && course?.published ? (
        <Tooltip title="Unpublish">
          <HighlightOffIcon
            // onClick={handlePublish}
            // onClick={(e) => handleUnpublish(e, course._id)}
            className="h5 pointer text-danger"
          />
        </Tooltip>
      ) : (
        <Tooltip title="Publish">
          <CheckCircleOutline
            // onClick={(e) => handlePublish(e, course._id)}
            className="h5 pointer text-success"
          />
        </Tooltip>
      )} */}
    </div>
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
