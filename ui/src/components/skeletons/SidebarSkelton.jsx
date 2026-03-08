import {Users} from 'lucide-react';
const SidebarSkelton = () => {
  const SkeltopContacts=Array(8).fill(null);
  return (
    <aside className='h-full lg:w-72 border-r border-base-200 flex flex-col duration-200 '>
      <div className='border-b border-base-300 w-full p-5 '>
        <div className='flex items-center gap-2'>
          <Users className='size-6'/>
        </div>
        <span className='hidden font-medium lg:block'>Contacts</span>
      </div>
      <div className='overflow-y-auto w-full py-3'>
        {SkeltopContacts.map((_,_id)=>(
          <div key={_id} className='w-full p-3 items-center gap-3'>
           <div className='relative mx-auto lg:mx-0'>
            <div className='skelton size-12 rounded-full'/>
           </div>
           {/* user info skelton only visible on larger screen */}
           <div className='hidden lg:block text-left min-w-0 flex-1'>
            <div className='skelton w-32 h-4 mb-2 '/>
            <div className='skelton h-3 w-16 ' />
           </div>
          </div>
          
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkelton
