import nc from "next-connect"
import connectDB from "../../connectDB"

import onError from "../../middlewares/errors"
import { getImages } from "../../controllers/imageCont"

const router = nc({ onError })

connectDB()

router.get(getImages)

export default router
