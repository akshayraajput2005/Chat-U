import { useState } from 'react';
import {useAuthStore} from '../store/UseAuthStore';
import {Camera,User,Mail} from 'lucide-react';
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
<p className='text-sm text-zinc-400'>
   {isUpdatingProfile?"updating..":"Click the camera icon to update you profile photo"}
</p>
      
        </div>


<div className='space-y-6' >
  <div className='space-y-2'>
    <div className='text-sm text-zinc-400 flex items-center gap-2 '> 
      <User classsName="w-4 h-4" />
      Full Name
       </div>
       <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
  </div>
   <div  className='space-y-1.5'>
      <div className='space-y-2'>
        <div className='text-sm text-zinc-400 flex items-center gap-2'
        
        > <Mail/> Email </div>
        <p className='border px-4 py-2.5 bg-base-200 rounded-lg'>
          {authUser?.email}

        </p>

      </div>
   </div>

<div className=' mt-6 bg-base-300 p-6 border rounded-xl '>
  <h2 className='text-sm mb-4'>Account Information</h2>
<div>
  <div className='flex items-center justify-between py-2 border-zinc-700'>
    <span className=''>
      Member since
    </span>
    <span>
      {authUser.createdAt?.split("T")[0]}
    </span>
  </div>
  <div className='flex items-center justify-between  '>
    <span className=''> Account status</span>
    <span className='  text-green-500'>Active</span>
  </div>
</div>
</div>


</div>


      </div>

     </div>  
  )
}

export default ProfilePage
