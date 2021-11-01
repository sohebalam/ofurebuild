import { useEffect } from "react"

import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress } from "@material-ui/core"
import { useRouter } from "next/router"
import { loadUser } from "../../redux/actions/userActions"

const StripeCallback = () => {
  const router = useRouter()
  const profile = useSelector((state) => state.profile)
  const { dbUser } = profile
  const dispatch = useDispatch()
  useEffect(() => {
    if (dbUser) {
      axios.post("/api/stripe/status").then((res) => {
        router.push("/user/instructor/dashboard")
        dispatch(loadUser())
      })
    }
  }, [dbUser])

  return <CircularProgress />
}

export default StripeCallback
