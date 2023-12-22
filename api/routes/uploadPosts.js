import express from "express"
import { sendEmail, uploadToInstagram } from "../controllers/uploadPost.js"

const router = express.Router()

router.post("/upload_to_instagram", uploadToInstagram)
router.post("/send_email", sendEmail)

export default router;