import nc from "next-connect"
import connectDB from "../../../connectDB"

import { stripeSuccess } from "../../../controllers/instructorCont"
import { isAuthenticated } from "../../../middlewares/auth"

import onError from "../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.use(isAuthenticated).get(stripeSuccess)

export default router
