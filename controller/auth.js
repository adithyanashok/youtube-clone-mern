import mongoose from "mongoose"
import User from "../models/User.js"
import CryptoJs from "crypto-js"
import { createError } from "../error.js";
import  jwt  from "jsonwebtoken";


export const signup = async (req, res, next) => {
   const newUser =  new User({
       name: req.body.name,
       email: req.body.email,
       password: CryptoJs.AES.encrypt(
         req.body.password,
         process.env.PASS_SEC
       ).toString()
      })
 try{
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
    console.log(savedUser)
 } catch (err) {
    next(err)
 }
}

export const signin = async (req, res, next) => {
   try {
     const user = await User.findOne({ name: req.body.name });
     if (!user) return next(createError(404, "User not found!"));
 
     const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
     )
      const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8)
      OriginalPassword !== req.body.password && res.status(401).json("Wrong Password")
       const accessToken = jwt.sign(
         {
            id: user._id,
         },
         process.env.JWT,
         { expiresIn:"9d" }
       )
       const {password, ...others} = user._doc;
       res.status(200).json({...others, accessToken})
   } catch (err) {
      console.log(err)
     next(err);
   }
 };