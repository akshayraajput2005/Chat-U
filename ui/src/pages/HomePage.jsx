import { useChatStore } from '../store/UseChatStore';
import NoChatSelected from '../components/NoChatselected';
import ChatContainer from '../components/ChatContainer'
import Sidebar from '../components/Sidebar';
const HomePage = () => {
const { selectedUser }=useChatStore();
  return (
    <div className='h-screen bg-base-300'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-lg max-w-6xl w-full h-[calc(100vh-8rem)] '>
            <div className='flex h-full rounded-lg overflow-hidden'>

            <Sidebar /> 
                 
            {!selectedUser ? <NoChatSelected/>:<ChatContainer />}
           
            </div>
        </div>

      </div>
      
    </div>
  )
}

export default HomePage
