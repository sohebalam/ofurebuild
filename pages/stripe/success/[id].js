import { useEffect } from "react"
// import { SyncOutlined } from "@ant-design/icons"
// import UserRoute from "../../../components/routes/UserRoute"
import { useRouter } from "next/router"
import axios from "axios"
import { CircularProgress, Grid } from "@material-ui/core"
import { loadUser } from "../../../redux/actions/userActions"
import { wrapper } from "../../../redux/store"
import { getSession } from "next-auth/react"

const StripeSuccess = () => {
  // router
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) successRequest()
  }, [id])

  console.log(id)

  const successRequest = async () => {
    const { data } = await axios.get(`/api/stripe/${id}`)
    // console.log("SUCCESS REQ DATA", data);
    router.push(`/user/course/${data.course.slug}`)
  }

  return (
    // <UserRoute>
    <Grid>
      <Grid item xs={9} mb="5">
        <div className="d-flex justify-content-center p-5">
          <CircularProgress />
        </div>
      </Grid>
      <Grid item xs={3} padding="5"></Grid>
    </Grid>
    // </UserRoute>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })

      store.dispatch(loadUser(req.headers.cookie, req))

      if (!session || !session?.user.role.includes("user")) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        }
      }
    }
)

export default StripeSuccess
