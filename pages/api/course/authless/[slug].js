import nc from "next-connect"
import connectDB from "../../../../connectDB"

// import { readCourse } from "../../../controllers/courseCont"

import onError from "../../../../middlewares/errors"

import { getFiles } from "../../../../controllers/lessonCont"

const router = nc({ onError })

connectDB()

// console.log(req.method)

router.get(getFiles)

export default router
