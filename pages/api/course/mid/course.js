import nc from "next-connect"
import connectDB from "../../../../connectDB"
import { create } from "../../../../controllers/courseCont"
import { CorsNext } from "../../../../middlewares/mid"

import onError from "../../../../middlewares/errors"
import { isAuthenticated, isInstructor } from "../../../../middlewares/auth"

const router = nc({ onError })

connectDB()

// CorsNext()

router.use(CorsNext, isAuthenticated, isInstructor).post(create)
// router.use(isInstructor).put(create)

export default router
