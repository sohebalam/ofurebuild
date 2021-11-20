import { useRouter } from "next/router"
import { studentCourses } from "../../../redux/actions/lessonActions"
import { wrapper } from "../../../redux/store"

const studentId = () => {
  const router = useRouter()

  const { studentId } = router.query

  console.log(studentId)

  return (
    <div>
      <h1>studentId </h1>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context

    await store.dispatch(
      studentCourses(req.headers.cookie, req, params.studentId)
    )
  }
)

export default studentId
