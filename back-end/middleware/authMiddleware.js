import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
const protect =asyncHandler( async (req,res,next)=> {
 let token 

 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        token  = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        console.error(error);
        res.status(401)
        throw new Error('not authorized,token failed')
    }
 }
 if(!token){
     res.status(401)
     throw new Error ('not authorized, no token')
 }

})

export  {protect}