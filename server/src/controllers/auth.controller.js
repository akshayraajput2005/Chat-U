import User from "../model/user.model.js";
import { generateToken } from "../lib/jstoken.js";
import cloudinary from "../lib/cloudianry.js";
import bcrypt from 'bcryptjs';


//                signup auth;
export const signup=async(req,res)=>{
const {email,password,fullName}=req.body;
try{
if(!email||!password||!fullName){
   return res.status(400).json({ message: "All fields are required" });
}
if(password.length<6){
return res.status(400).json({message:"password should be at least 6 "})
}
const user=await User.findOne({email});
if(user) return res.status(400).json({message:"email already exists"})

  
  const hashedPassword=await bcrypt.hash(password,10)
 const newUser= new User({
  fullName,
  email,
  password:hashedPassword,
 }) 
 if(newUser){
  //            saved in database
  await newUser.save()
       //           generate token here 
  generateToken(newUser._id,res);

  res.status(201).json({
    _id:newUser._id,
    fullName:newUser.fullName,
    email:newUser.email,
    profilePic:newUser.profilePic,
  });
 
  } else{
    res.status(400).json({ message: "Invalid user data" });
 }


}catch(error){
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
}
}

export const login=async (req,res)=>{
const {email,password}=req.body;
try{
if(!email||!password){ return res.status(400).json({message:"All felds are required "})};
const user=await User.findOne({email});
if(!user){ return res.status(400).json({ message: "Invalid credentials" });}

const isPasswordCorrect=await bcrypt.compare(password,user.password);
if(!isPasswordCorrect){
  res.status(400).json({message:"Invalid credentials"})
}

   generateToken(user._id,res);

 return  res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
});

}catch(error){
console.log("error in login controllers ", error.message)
res.status(500).json({message:"Internal server Eror"})
}
}
//                  logout 
export const logout=async(req,res)=>{
  try{
    res.cookie("jwt","",{maxAge:0});
res.status(200).json({message:"logout succecfully"})
  }catch(error){
    console.log("Error in logout controller",error.message);
    res.status(500).json({message:"Internal server error"});
  }
}
 //           update profilePic 
 export const updateProfile=async(req,res)=>{
const {profilePic}=req.body
const userId=req._id;
try{
  if(!profilePic){
   return res.status(400).json({ message: "Profile pic is required" });
};
const updateProfile=await cloudinary.uploader(profilePic);
const updatedUser=await User.findByIdAndUpdate(
  userId,{
profilePic:uploadResponse.secure_url
  },
  {new:true}
)
 res.status(200).json(updatedUser)

}catch(error){
console.log("Error in Update controllers ",error.message);
res.status(500).json({message:"Internal server error"});
} }

//                check Auth 

export const checkAuth=async(req,res)=>{
try{
  res.status(200).json(req.user);
}catch(error){
console.log("Error in checkAuth controllers ",error.message);
res.status(500).json({message:"Internal server Error"});
}};
