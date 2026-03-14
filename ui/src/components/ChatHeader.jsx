import {X} from 'lucide-react'
import { useAuthStore } from '../store/UseAuthStore'
import { useChatStore } from '../store/UseChatStore'

 
 const ChatHeader = () => {

const {selectedUser,setSelectedUser}=useChatStore();
const {onlineUsers}=useAuthStore();

   return (
     <div className='p-2.5 border-base-300 '>
      <div className='flex items-center justify-between '>
<div className='flex items-center gap-3 '>
  <div className='avatar'>
    <div className='size-10 rounded-full relative'>
  <img src={selectedUser.profilePic||"/avatar.png"} alt={selectedUser.fullName} />
    </div>
  </div>
</div>
      </div>
       
     </div>
   )
 }
 
 export default ChatHeader
 