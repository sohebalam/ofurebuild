import { useEffect, useState } from "react"
import axios from "axios"
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { Container } from "@material-ui/core"
import { loadUser, regInstructor } from "../../../redux/actions/userActions"
import { useRouter } from "next/router"
import { Alert } from "@material-ui/lab"
import { wrapper } from "../../../redux/store"
import { getSession } from "next-auth/client"

const New = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile
  const router = useRouter()

  const newInstructor = useSelector((state) => state.newInstructor)
  const {
    loading: instructorLoading,
    error: instructorError,
    link,
  } = newInstructor

  useEffect(() => {
    if (link) {
      // window.location.href = link
      router.push(link)
    } else {
      instructorError
    }
  }, [link])

  const BecomeInstructor = async (e) => {
    e.preventDefault()

    console.log("Become Instructor")
    dispatch(regInstructor())
  }

  return (
    <>
      <Typography variant="h3">Become an Instructor</Typography>

      {instructorLoading ? (
        <CircularProgress />
      ) : (
        <Container component="main">
          <Box mt="1rem">
            <Typography>
              Register with Stripe to receive payments from students
            </Typography>
          </Box>
          <Box mt="1rem">
            <Button
              onClick={BecomeInstructor}
              variant="contained"
              color="secondary"
              // disabled={(dbUser && (dbUser.role = "instructor")) || loading}
            >
              Register for Stripe
            </Button>
          </Box>
          {instructorError && <Alert severity="error">{instructorError}</Alert>}
        </Container>
      )}
    </>
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

export default New
