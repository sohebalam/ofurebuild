import nc from "next-connect"
import connectDB from "../../../../connectDB"

import onError from "../../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"
import { fileDownload } from "../../../../controllers/fileCont"

const router = nc({ onError })

connectDB()

// console.log("here")

router.use(isAuthenticated, isInstructor).get(fileDownload)

export default router
