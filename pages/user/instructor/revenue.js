// import { useState, useEffect } from "react"
// import InstructorRoute from "../../../components/routes/InstuctorRoute"
// import axios from "axios"

// import { stripeCurrencyFormatter } from ".././../../utils/currency"
// import { useRouter } from "next/router"
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
// import SettingsIcon from "@mui/icons-material/Settings"
// import { CircularProgress } from "@mui/material"
// import { Container, CssBaseline, Grid, Typography } from "@material-ui/core"
// import { Box } from "@mui/system"

// const InstructorRevenue = () => {
//   // const [balance, setBalance] = useState({ pending: [] })
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     let isCancelled = false
//     if (!isCancelled) {
//       // sendBalanceRequest()
//     }
//     return () => {
//       isCancelled = true
//     }
//   }, [])

//   // const sendBalanceRequest = async () => {
//   //   setLoading(true)
//   //   const { data } = await axios.get("/api/instructor/balance")
//   //   setBalance(data)
//   //   setLoading(false)
//   // }

//   const handlePayoutSettings = async () => {
//     try {
//       setLoading(true)
//       const { data } = await axios.get("/api/instructor/payout")
//       // console.log(data)

//       router.push(data)
//     } catch (err) {
//       setLoading(false)
//       console.log(err)
//       alert("Unable to access payout settings. Try later.")
//     }
//   }

//   return (
//     <InstructorRoute>
//       <>
//         <Box style={{ marginLeft: "6rem", marginTop: "1rem" }}></Box>
//         <Container component="main" maxWidth="sm">
//           <Box style={{ marginLeft: "6rem", marginBottom: "2rem" }}>
//             <Grid container>
//               <Grid item>
//                 <Typography variant="h5">
//                   Revenue report <MonetizationOnIcon className="float-right" />{" "}
//                 </Typography>
//                 <small>
//                   You get paid directly from stripe to your bank account every
//                   48 hour
//                 </small>
//                 <hr />

//                 <Typography variant="h5">
//                   Pending balance{" "}
//                   {/* {balance?.pending &&
//                     balance?.pending.map((bp, i) => (
//                       <span key={i} className="float-right">
//                         {stripeCurrencyFormatter(bp)}
//                       </span>
//                     ))} */}
//                 </Typography>
//                 <small>For last 48 hours</small>
//                 <hr />
//                 <Typography variant="h5">
//                   Payouts{" "}
//                   {!loading ? (
//                     <SettingsIcon
//                       className="float-right pointer"
//                       onClick={handlePayoutSettings}
//                     />
//                   ) : (
//                     <CircularProgress />
//                   )}
//                 </Typography>
//                 <small>
//                   Update your stripe account details or view previous payouts.
//                 </small>
//               </Grid>
//             </Grid>
//           </Box>
//         </Container>
//       </>
//     </InstructorRoute>
//   )
// }

// export default InstructorRevenue
import { useState, useEffect } from "react"
import axios from "axios"
// import InstructorRoute from "../../../components/route/Instructor"
import { Avatar, Button, Grid, Tooltip, Typography } from "@material-ui/core"
import Link from "next/link"
import { useSelector } from "react-redux"
import { wrapper } from "../../../redux/store"
import { loadCourses } from "../../../redux/actions/lessonActions"
import Publish from "../../../components/course/Publish"
const InstructorIndex = () => {
  const coursesLoad = useSelector((state) => state.coursesLoad)
  const { loading, error, courses } = coursesLoad

  return (
    <>
      <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
      {courses &&
        courses.map((course) => (
          <Grid container key={course._id}>
            <Grid item xs={3}>
              <Avatar
                style={{ height: "100px", width: "100px" }}
                src={course?.images ? course.images[0]?.url : "/course.jpg"}
              />
            </Grid>
            <Grid item xs={6}>
              <Link href={`/user/instructor/course/${course.slug}`}>
                <a>
                  {/* <Button style={{ underline: true }}> */}
                  <Typography variant="h5">{course?.title}</Typography>
                  {/* </Button> */}
                </a>
              </Link>
              <p>{course.lessons?.length}</p>
            </Grid>
            <Grid item xs={3}>
              <Publish
                initCourse={course}
                slug={course.slug}
                lessons={course.lessons}
              />
            </Grid>
          </Grid>
        ))}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // const session = await getSession({ req })

      await store.dispatch(loadCourses(req.headers.cookie, req))
      // await store.dispatch(getlessons(req.headers.cookie, req, slug))
    }
)

export default InstructorIndex
