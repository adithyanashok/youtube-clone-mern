import { createError } from "../error.js"
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"

export const addComment = async (req, res, next) => {
    console.log("req.body", req.body)
    const newComment = new Comment({...req.body, userId:req.user.id})
    try{
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    } catch (err) {
        next(err)
    }
}

export const deleteComment = async (req, res, next) => {
    try{
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        console.log("req.use.id ", req.user.id)
        console.log("comment.userId ", comment.userId)
        console.log("video.userId ", video.userId)


        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("comment Deleted")
        } else {
            next(createError(403, "you can delete only your account"))
        }
    } catch (err) {
        next(err)
    }
}
export const getComments = async (req, res, next) => {
    try{
        const comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}