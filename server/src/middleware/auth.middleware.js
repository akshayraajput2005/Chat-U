import jwt from 'jsonwebtoken'
import User from "../model/user.model.js";
export const protectedRoute=async(req,res,next)=>{
try{
  const token=req.cookies.jwt;
  if(!token){
    return res.status(401).json({message:"Unauthorised not token provided"})
  }
  const decode=jwt.verify(token,process.env.JWT_SECRET);
  
  if(!decode){
    return res.status(401).json({message:"Unauthorised - Invalid Token"});
  }
const user= await User.findById(decode.userId).select("-password");

if(!user){
  return res.status(404).json({message:"User Not found"})
}
 req.user=user;
 next()
}catch(error){
  console.log("Error in auth Middleware ", error.message)
  res.status(500).json({message:"Internal server error"})
}}

