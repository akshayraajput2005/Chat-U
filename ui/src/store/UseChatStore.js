import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import toast from "react-hot-toast";
import {useAuthStore} from '../store/UseAuthStore.js'
export const useChatStore=create((get,set)=>({
messages:[],
users:[],
selectedUser:null,
isUserLoading:false,
isMessageLoading:false,

getUser:async()=>{
  set({isUserLoading:true});
  try {
    const res=await axiosInstance.get("messages/users");
    set({users:res.data}) 
    console.log(res.data)
  } catch (error) {
     toast.error(error?.response?.data?.message||"something wrong in the  getUser");
  }finally{
    set({isUserLoading:false})
  }
  
},

getMessages:async (userId)=>{
  set({isMessageLoading:true})
  try {
    const res=await axiosInstance.get(`messages/${userId}`)
    set({messages:res.data})
  } catch (error) {
    toast.error(error.response.data.message);
  }finally{
    set({isMessageLoading:false})
  }
},
sendMessages:async(messageData)=>{
const {selectedUser,messages}=get();
try{
const res=await axiosInstance.post(`messages/send${selectedUser._id,messageData}`);
set({messages: [...messages,res.data]})
}catch(error){
 toast.error(error.response.data.message);
}
},
subscribeToMessages:()=>{
const {selectedUser}=get();
if(!selectedUser) return;
  const socket=useAuthStore.getState().socket;

  socket.on("newMessage",(newMessage)=>{
   const isMessageSentFromSelectedUser=newMessage.senderId==selectedUser._id;
   if(!isMessageSentFromSelectedUser) return;

   set({
    message:[...get().messages,newMessage]
   })

})

},
unSubsctibeFromMessages:()=>{
  const socket=useAuthStore.getState().socket;
  socket.off("newMessage");
}
}))