import express from "express";
import { googleAuth, signin, signup } from "../controller/auth.js";

const router = express.Router()
// CREATE USER
router.post("/signup", signup )
// SIGN IN
router.post("/signin", signin )

// GOOGLE
router.post("/google", googleAuth )

export default router;