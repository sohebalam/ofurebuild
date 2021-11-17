import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { loadUser } from "../../redux/actions/userActions"
import { CircularProgress } from "@material-ui/core"
import { useSelector } from "react-redux"
import { useSession } from "next-auth/client"

const StudentRoute = ({ children, showNav = true }) => {
  // state
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  const { session } = useSession()

  console.log(dbUser)
  const router = useRouter()

  useEffect(() => {
    if (!dbUser) {
      if (session) {
        dispatch(loadUser())
      }
    }

    if (dbUser && dbUser.role && !dbUser.role.includes("user")) {
      router.push("/")
    }
  }, [dbUser])

  return (
    <>
      {!dbUser ? (
        <CircularProgress />
      ) : (
        <div className="container-fluid">{children}</div>
      )}
    </>
  )
}

export default StudentRoute
