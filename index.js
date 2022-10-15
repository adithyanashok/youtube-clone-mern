import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/users.js';
import videosRoutes from './routes/videos.js';
import commentsRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express()

 dotenv.config()

const connect = () => {
 mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to DB")
 }).catch((err) => {
    throw err;
 })
}
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videosRoutes)
app.use("/api/comments", commentsRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })

})

app.listen(process.env.PORT || 5000, () => {
    connect()
    console.log("Server Started")
})