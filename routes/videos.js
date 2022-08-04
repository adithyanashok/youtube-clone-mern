import express from "express";
import { addVideo, addViews, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controller/video.js";
import { verifyToken, verifyTokenAndAuthorization } from "../verifyToken.js";

const router = express.Router()
// Create 
router.post("/", verifyTokenAndAuthorization, addVideo)
// update
router.put("/:id", verifyToken, updateVideo)
// Delete
router.delete("/:id", verifyToken, deleteVideo)
// Get
router.get("/find/:id", getVideo)
router.put("/views/:id", addViews)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", verifyTokenAndAuthorization, sub)
router.get("/tags", getByTag)
router.get("/search", search)






export default router;