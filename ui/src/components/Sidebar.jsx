
import {Users} from 'lucide-react';
import { useState,useEffect  } from 'react';
import {useChatStore} from '../store/UseChatStore';
import { useAuthStore } from '../store/useAuthStore.js';

const Sidebar = () => {
const {getUsers,users,isUserLoading, setSelectedUser,SelectedUser}=useChatStore();

const{onlineUser}=useAuthStore();
const [showOnlineOnly, setShowOnlineOnly] = useState(false);

useEffect(() => {
getUsers()
}, [getUsers])


const filteredUsers=showOnlineOnly?users.filter((users)=>onlineUser.includes(users._id)):users;
if(isUserLoading) return <SidebarSkelton/>


 
  return (
<aside className='h-full lg:w-72 flex flex-col border-r border-base-100   transition-all duration-200'>
  <div className='border-b border-base-300 w-full p-8 '>
    <div className='flex items-center gap-2 '>
      <Users />
      <span className='font-medium hidden lg:block '>Contacts</span>
    </div>
    <div className='mt-3 hidden lg:flex items-center gap-2 '>
      

    </div>

  </div>

</aside>
  )
}

export default Sidebar
