import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { CircularProgress } from "@material-ui/core"
const UserRoute = ({ children, showNav = true }) => {
  // state
  const [data, setData] = useState(false)
  // router
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/profile")
      //   console.log(data);
      if (data) setData(true)
      // console.log(data)
    } catch (err) {
      console.log(err)
      setData(false)
      router.push("/user/login")
    }
  }

  return <>{!data ? <CircularProgress /> : <div>{children}</div>}</>
}

export default UserRoute
