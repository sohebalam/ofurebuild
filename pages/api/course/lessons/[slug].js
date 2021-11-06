import nc from "next-connect"
import connectDB from "../../../../connectDB"

import onError from "../../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"
import { getFiles } from "../../../../controllers/lessonCont"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated, isInstructor).get(getFiles)

export default router
