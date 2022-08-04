// import jwt from "jsonwebtoken";
// import { createError } from "./error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) return next(createError(401, "You are not authenticated!"));

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     req.user = user;
//     next()
//   });
// };
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    console.log("auth ", req.headers)
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT, (err, user) => {
            if(err) res.status(403).json("Toke not valid")
            req.user = user
            next()
        })
    } else {
        res.status(401).json("You are not authenticated")
    }
}
export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            res.status(403).json("You are not allowed to do that")
        }
    })
}