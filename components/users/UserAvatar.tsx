import Image from 'next/image'
import type { UserInterface } from 'interfaces/users/User'

export default function UserAvatar ({ user }: { user: UserInterface }): React.JSX.Element {
  return (
    <div className='relative'>
      <Image
        className='object-cover w-20 h-20 mb-4 border-[3px] bg-black border-black rounded-full'
        src={user.avatar}
        alt={user.username}
        width='80'
        height='80'
        preload
      />
      {!user.confirmationStatus && (
        <div className='absolute flex justify-center w-3 h-3 rounded-full top-1 left-1 group/tooltip-1 cursor-help bg-red'>
          <div className='absolute invisible tracking-widest uppercase leading-none p-2 font-bold text-[8px] text-center transition-all ease-in-out opacity-0 top-4 bg-white dark:bg-light-blue rounded-3xl duration-400 group-hover/tooltip-1:opacity-100 group-hover/tooltip-1:visible'>
            Unconfirmed account
          </div>
        </div>
      )}
      {user.confirmationStatus && !user.recentlyActive && (
        <div className='absolute flex justify-center w-3 h-3 rounded-full top-1 left-1 group/tooltip-2 cursor-help bg-yellow'>
          <div className='absolute invisible tracking-widest uppercase leading-none p-2 font-bold text-[8px] text-center transition-all ease-in-out opacity-0 top-4 bg-white dark:bg-light-blue rounded-3xl duration-400 group-hover/tooltip-2:opacity-100 group-hover/tooltip-2:visible'>
            Confirmed account
          </div>
        </div>
      )}
      {user.recentlyActive && (
        <div className='absolute flex justify-center w-3 h-3 rounded-full top-1 left-1 group/tooltip-3 cursor-help bg-green'>
          <div className='absolute invisible tracking-widest uppercase leading-none p-2 font-bold text-[8px] text-center transition-all ease-in-out opacity-0 top-4 bg-white dark:bg-light-blue rounded-3xl duration-400 group-hover/tooltip-3:opacity-100 group-hover/tooltip-3:visible'>
            Recently active
          </div>
        </div>
      )}
    </div>
  )
}
