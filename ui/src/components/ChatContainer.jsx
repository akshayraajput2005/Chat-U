import { useChatStore } from "../store/UseChatStore"
import { useAuthStore } from "../store/UseAuthStore"
import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
 const {mmessages ,getMessages,isMessageLoading,selectedUser}=useChatStore();
 useEffect(() => {
   getMessages(selectedUser._id)
  }, [selectedUser._id,getMessages])
  
 if(isMessageLoading) return <div>Loading...</div>
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <p>Message..</p>
      <MessageInput />
      
    </div>
  )
}

export default ChatContainer
