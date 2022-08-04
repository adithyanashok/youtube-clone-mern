import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from "../controller/user.js";
import { verifyToken, verifyTokenAndAuthorization } from "../verifyToken.js";

const router = express.Router()

// Update
router.put("/:id", verifyToken, update)
// Delete
router.delete("/:id", verifyToken, deleteUser)
// Get User
router.get("/find/:id", getUser)
//  subscribe
router.put("/sub/:id", verifyTokenAndAuthorization, subscribe)
// unsubscribe
router.put("/unsub:id", verifyToken, unsubscribe)
// like
router.put("/like/:videoId", verifyToken, like)
// dislike
router.put("/dislike/:videoId", verifyToken, dislike)


export default router;