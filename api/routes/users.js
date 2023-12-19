import express from "express"
import { getAllUsers, getUserByUsername, updateUser } from "../controllers/user.js"
import {authUserRole} from "../middleware/verifyJWT.js"

const router = express.Router()

// router.get("/:id", getUserById)
router.get("/user/:username", getUserByUsername)
router.get("/get_users", authUserRole(["admin"]), getAllUsers)
router.put("/user/:id", updateUser)

export default router