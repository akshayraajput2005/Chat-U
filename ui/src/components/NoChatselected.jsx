import { MessageSquare } from "lucide-react"
 


const NoChatselected = () => {
  return (
    <div className="w-full h-full flex flex-col flex-1 items-center justify-center  p-16 bg-base-100/50  ">
      <div className="max-w-md text-center gap-4 mb-4 ">
        <div className="flex justify-center gap-5 mb-4 items-center">
          <div className="relative "> 
            <div className="w-16 h-16 rounded-2xl ">
            <MessageSquare className="w-8 h-8 text-primary " />
            </div>         
          </div>

        </div>
  <h2 className="text-2xl font-bold">Welcome to Chat Me!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  )
}

export default NoChatselected;
