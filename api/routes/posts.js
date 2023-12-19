import express from "express"
import { addPost, deletePost, getPost, getPosts, getUserPosts, updatePost } from "../controllers/post.js"
import {authGroupExists} from "../middleware/verifyJWT.js"
const router = express.Router()

router.get("/:group_name", authGroupExists(), getPosts)
router.get("/",  getPosts)
router.get("/:id", getPost)
router.get("/your_posts/:id", getUserPosts)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)

export default router;