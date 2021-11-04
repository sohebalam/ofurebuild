import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { SyncOutlined } from "@ant-design/icons"
import { loadUser } from "../../redux/actions/userActions"

const StudentRoute = ({ children, showNav = true }) => {
  // state
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

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
      {!data ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">{children}</div>
      )}
    </>
  )
}

export default StudentRoute
