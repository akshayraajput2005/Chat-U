import User from "../model/user.model.js";
import Message from "../model/message.model.js";

import Cloudinary from '../lib/cloudianry.js';
//get users for sider 
export const getUserForSider=async(req,res)=>{
try{const loggedInUserId=req.user._id;
  const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
  res.status(200).json(filteredUsers);
  
}catch(error){
 console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
}
}


//get messsages
export const getMessages=async(req,res)=>{
try {
  const {id:userToChatId}=req.params;
  const myId=req.user._id;
  const messages=await Message.find({
    $or:[
      {senderId:myId,receiverId:userToChatId},
      {senderId:userToChatId,receiverId:myId},
    ],
  })
  res.status(200).json(messages)
} catch (error) {
  console.log("Error in the get message",error.messages)
  res.status(500).json({message:"Internal server Error"})
}
}

//Send Messaages 
export const sendMessage=async(req,res)=>{
try{
  const {text,image}=req.body;
  const{id:receiverId}=req.params;
  let imageUrl;
  if(image){
    const uploadResponse=await Cloudinary.uploader(image);
    imageUrl=uploadResponse.secure_url;
  }
  const newMessage=new Message({
    senderId,
    receiverId,
    text,
    image:imageUrl,
  });
  await newMessage.save();
const receiverSocketId=getReceiverSocketId(receiverId);

}catch(error){
console.log("Error in sendMessages",error.message);
res.status(500).json({message:"Internal server error"});
};
};