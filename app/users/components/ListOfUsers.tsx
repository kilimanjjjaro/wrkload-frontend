import Image from 'next/image'
import { EnvelopeIcon, PencilSquareIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import UserInterface from 'interfaces/users/User'

const fetchUsers = (): UserInterface[] => {
  const data = [
    { id: 1, username: 'kilimanjjjaro', email: 'hola@kilimanjjjaro.com', role: 1, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: true },
    { id: 1, username: 'rivotril', email: 'hola@kilimanjjjaro.com', role: 2, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: false },
    { id: 1, username: 'AG5', email: 'hola@kilimanjjjaro.com', role: 3, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: false },
    { id: 1, username: 'kediev', email: 'hola@kilimanjjjaro.com', role: 1, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: true }
  ]
  return data
}

export default async function ListOfUsers (): Promise<JSX.Element> {
  const users = await fetchUsers()

  return (
    <MasonryGrid>
      {users.map((user, index) => (
        <div key={index} className='relative flex flex-col items-start bg-gray-200 group p-7 dark:bg-white rounded-3xl'>
          <div className='relative'>
            <Image
              className='object-cover w-20 h-20 mb-4 rounded-full'
              src={user.avatar}
              alt={user.username}
              width='80'
              height='80'
            />
            <div className='absolute top-0 left-0 w-[18px] h-[18px] rounded-full bg-custom-red' />
          </div>
          <h3 className='mb-4 text-3xl font-bold font-primaryFont'>{user.username}</h3>
          <div className='flex mb-3 items-center h-6 px-2 text-[10px] font-bold text-gray-500 uppercase border-2 border-gray-500 rounded-full gap-x-1 font-secondaryFont'>
            {user.role === 1 && 'Administrator'}
            {user.role === 2 && 'Project Manager'}
            {user.role === 3 && 'Partner'}
          </div>
          <div className='flex items-center h-8 px-4 mb-3 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><EnvelopeIcon className='w-4 stroke-width-2' /> {user.email}</div>
          <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><UserIcon className='w-4 stroke-width-2' /> {user.registeredAt}</div>
          <div className='absolute left-0 flex justify-center w-full transition duration-500 ease-in-out opacity-100 -top-4 xl:opacity-0 gap-x-3 group-hover:opacity-100'>
            <div className='flex items-center h-8 px-4 text-black transition duration-500 ease-in-out rounded-full cursor-pointer bg-custom-yellow hover:text-white hover:bg-black'><PencilSquareIcon className='w-4 stroke-width-2' /></div>
            <div className='flex items-center h-8 px-4 text-black transition duration-500 ease-in-out rounded-full cursor-pointer bg-custom-red hover:text-white hover:bg-black'><TrashIcon className='w-4 stroke-width-2' /></div>
          </div>
        </div>
      ))}
    </MasonryGrid>
  )
}
