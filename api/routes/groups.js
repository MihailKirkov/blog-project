import express from "express"
import { getUserGroups } from "../controllers/group.js"
const router = express.Router()

router.get("/user_groups/:id", getUserGroups)

export default router;