import nc from "next-connect"
import connectDB from "../../../connectDB"

import onError from "../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../middlewares/auth"
import { studentCount } from "../../../controllers/instructorCont"

const router = nc({ onError })

connectDB()

// console.log("here")

router.use(isAuthenticated, isInstructor).post(studentCount)

export default router
