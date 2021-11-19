import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { CircularProgress } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { useSession } from "next-auth/client"
const UserRoute = ({ children }) => {
  // state
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  const { session } = useSession()

  console.log(dbUser)
  const router = useRouter()

  useEffect(() => {
    if (!dbUser) {
      if (session) {
        useDispatch(loadUser())
      }
    }

    if (
      dbUser === null ||
      (dbUser && dbUser.role && !dbUser.role.includes("user"))
    ) {
      router.push("/")
    }
  }, [dbUser])
  return <>{!dbUser ? <CircularProgress /> : <div>{children}</div>}</>
}

export default UserRoute
