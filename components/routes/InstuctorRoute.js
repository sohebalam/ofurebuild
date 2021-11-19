import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { CircularProgress } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { loadUser } from "../../redux/actions/userActions"
import { useSession } from "next-auth/client"

const InstructorRoute = ({ children }) => {
  const [session] = useSession()
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  const dispatch = useDispatch()
  // state

  // router
  const router = useRouter()

  useEffect(() => {
    if (!dbUser) {
      if (session) {
        dispatch(loadUser())
      }
    }

    if (
      dbUser === null ||
      (dbUser && dbUser.role && !dbUser.role.includes("instructor"))
    ) {
      router.push("/")
    }
  }, [dbUser])

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <>{children}</>
        </>
      )}
    </>
  )
}

export default InstructorRoute
