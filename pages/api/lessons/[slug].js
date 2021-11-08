import nc from "next-connect"

import connectDB from "../../../connectDB"
import onError from "../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../middlewares/auth"
import { lessonOrder } from "../../../controllers/lessonCont"
connectDB()

export const config = {
  api: {
    bodyParser: true,
  },
}

const router = nc({ onError })

// console.log("here")

// router.use(isAuthenticated, isInstructor).post(formidableSave)
router.use(isAuthenticated, isInstructor).post(lessonOrder)

export default router
