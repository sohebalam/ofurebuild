import nc from "next-connect"
import connectDB from "../../../connectDB"
// import cors from "cors"
import NextCors from "nextjs-cors"
import { uploadImage, removeImage } from "../../../controllers/courseCont"
import { CorsNext } from "../../../middlewares/mid"

import onError from "../../../middlewares/errors"
import next from "next"

const router = nc({ onError })

connectDB()

router.use(CorsNext).post(uploadImage)
// router.delete(removeImage)

export default router
