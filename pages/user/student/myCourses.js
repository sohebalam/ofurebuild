import { Grid } from "@material-ui/core"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import CourseCard from "../../../components/course/CourseCard"
import { studentCourses } from "../../../redux/actions/lessonActions"
import { wrapper } from "../../../redux/store"
import { useRouter } from "next/router"

const studentId = () => {
  const coursesStudent = useSelector((state) => state.coursesStudent)
  const { loading, error, courses } = coursesStudent

  const coursesArray = courses.filter((course) => course?.published)

  // console.log(coursesArray)

  const router = useRouter()

  const location = router.asPath.split("/")[3]
  return (
    <Grid container>
      {coursesArray &&
        coursesArray?.map((course) => (
          <Grid item key={course?._id} xs={4}>
            <Box
              style={{
                padding: "0.5rem",
                paddingLeft: "0",
                paddingRight: "0",
              }}
            >
              {coursesArray && <CourseCard course={course} local={location} />}
            </Box>
          </Grid>
        ))}
    </Grid>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context

    await store.dispatch(studentCourses(req.headers.cookie, req))
  }
)

export default studentId
