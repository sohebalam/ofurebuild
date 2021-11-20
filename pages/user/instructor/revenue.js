import { useState, useEffect } from "react"
import axios from "axios"

import { stripeCurrencyFormatter } from ".././../../utils/currency"
import { useRouter } from "next/router"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import SettingsIcon from "@mui/icons-material/Settings"
import { CircularProgress } from "@mui/material"
import { Container, CssBaseline, Grid, Typography } from "@material-ui/core"
import { Box } from "@mui/system"
import { wrapper } from "../../../redux/store"
import { getSession } from "next-auth/client"
import { loadUser } from "../../../redux/actions/userActions"

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let isCancelled = false
    if (!isCancelled) {
      sendBalanceRequest()
    }
    return () => {
      isCancelled = true
    }
  }, [])

  const sendBalanceRequest = async () => {
    setLoading(true)
    const { data } = await axios.get("/api/instructor/balance")
    setBalance(data)
    setLoading(false)
  }

  const handlePayoutSettings = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/instructor/payout")
      // console.log(data)

      router.push(data)
    } catch (err) {
      setLoading(false)
      console.log(err)
      alert("Unable to access payout settings. Try later.")
    }
  }

  return (
    <>
      <Box style={{ marginLeft: "6rem", marginTop: "1rem" }}></Box>
      <Container component="main" maxWidth="sm">
        <Box style={{ marginLeft: "6rem", marginBottom: "2rem" }}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">
                Revenue report <MonetizationOnIcon className="float-right" />{" "}
              </Typography>
              <small>
                You get paid directly from stripe to your bank account every 48
                hour
              </small>
              <hr />

              <Typography variant="h5">
                Pending balance{" "}
                {/* {balance?.pending &&
                    balance?.pending.map((bp, i) => (
                      <span key={i} className="float-right">
                        {stripeCurrencyFormatter(bp)}
                      </span>
                    ))} */}
              </Typography>
              <small>For last 48 hours</small>
              <hr />
              <Typography variant="h5">
                Payouts{" "}
                {!loading ? (
                  <SettingsIcon
                    className="float-right pointer"
                    onClick={handlePayoutSettings}
                  />
                ) : (
                  <CircularProgress />
                )}
              </Typography>
              <small>
                Update your stripe account details or view previous payouts.
              </small>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })

      store.dispatch(loadUser(req.headers.cookie, req))

      if (!session || !session.user.role.includes("instructor")) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        }
      }
    }
)

export default InstructorRevenue
