import nc from "next-connect"
import connectDB from "../../../connectDB"
import { youtube } from "../../../controllers/courseCont"

import onError from "../../../middlewares/errors"

const router = nc({ onError })

connectDB()

router.get(youtube)
// router.delete(removeImage)

export default router
