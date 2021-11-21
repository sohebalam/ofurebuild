import nc from "next-connect"

import connectDB from "../../../../connectDB"
connectDB()

import onError from "../../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"
import { deleteFile } from "../../../../controllers/lessonCont"

const router = nc({ onError })

router.use(isAuthenticated, isInstructor).delete(deleteFile)

export default router
