import express from "express";
import { login, logout, register, getCookie } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getCookie", getCookie);
// router.get("/protected", authorization, (req, res) => {
//     return res.json({ user: { id: req.userId, role: req.userRole } });
// });

export default router;