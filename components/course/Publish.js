import { Tooltip } from "@material-ui/core"
import { CheckCircleOutline } from "@material-ui/icons"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { getlessons, lessonsGet } from "../../redux/actions/lessonActions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
const Publish = ({ course, slug }) => {
  const lessonsList = useSelector((state) => state.lessonsList)
  const { loading: lessonsLoading, error: errorLoading, lessons } = lessonsList
  console.log(course, slug, lessons)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(lessonsGet(slug))
  }, [])

  return (
    <div>
      {lessons?.lessons && lessons?.lessons.length < 5 ? (
        <Tooltip title="Min 5 lessons required to publish">
          <HelpOutlineIcon className="h5 pointer text-danger" />
        </Tooltip>
      ) : course.published ? (
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
      )}
    </div>
  )
}

export default Publish
