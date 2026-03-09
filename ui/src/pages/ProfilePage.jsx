import { useState } from 'react';
import {useAuthStore} from '../store/UseAuthStore';
import {Camera} from 'lucide-react';
const ProfilePage = () => {
  
const [selectedImg, setselectedImg] = useState(null)

 const {authUser,isUpdatingProfile,updateProfile}=useAuthStore();

 const handleImageUpload=async(e)=>{

  const file=e.target.value[0]
  
if(!file) return;

const reader=new FileReader(file);

reader.onload=async()=>{
   const base64Img=reader.result;
   setselectedImg(base64Img);
   await updateProfile({profilePic:base64Img})
}


   
 }
  return (
    <div className='h-screen ppt-20' >
     <div className='max-w-2xl mx-auto p-4 py-14'> 
      <div className='text-center'>
        <h1 className=' text-2xl font-semibold'>Profile</h1>
        <p className='font-medium '>Your Profile information </p>
      </div>
      <div className='flex items-center flex-col gap-4'>
        <div className='relative'>
   <img src={selectedImg||authUser.profilePic||"/avatar.png"} alt="profile"
   className='size-32 rounded-full object-cover border-4'
   />
   <label htmlFor="avtar-upload"
   className={`absolute bottom-0 right-0 bg-base-100 cursor-pointer transition-all duration-200${isUpdatingProfile?"animated-pulse pointer-events-none ":""}`} >
       <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>

        </div>
        

        </div>

      </div>

     </div>  
  )
}

export default ProfilePage
