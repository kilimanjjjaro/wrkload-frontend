import { useContext } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { EnvelopeIcon, PencilSquareIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline'
import GlobalStats from 'app/components/shared/stats/GlobalStats'
import Pagination from 'app/components/shared/Pagination'
import MasonryGrid from 'app/components/shared/MasonryGrid'

import { DataContext } from 'context/DataContext'
import { ModalsContext } from 'context/ModalsContext'
import type { UserInterface } from 'interfaces/users/User'

interface Props {
  users: UserInterface[]
}

export default function UserList ({ users }: Props): JSX.Element {
  const { setSelectedUser } = useContext(DataContext)
  const { setUpdateDataModalStatus, setDeleteDataModalStatus } = useContext(ModalsContext)

  const handleUpdateUserClick = (user: UserInterface): void => {
    setSelectedUser(user)
    setUpdateDataModalStatus(true)
  }

  const handleDeleteUserClick = (user: UserInterface): void => {
    setSelectedUser(user)
    setDeleteDataModalStatus(true)
  }

  return (
    <div>
      <MasonryGrid>
        {users.map((user) => (
          <div key={user._id} className='relative flex flex-col items-start transition ease-in-out bg-white hover:bg-white duration-400 text-dark-gray group p-7'>
            {user.avatar !== undefined && (
              <div className='relative'>
                <Image
                  className='object-cover w-20 h-20 mb-4'
                  src={user.avatar}
                  alt={user.username}
                  width='80'
                  height='80'
                />
                {!user.confirmationStatus && <div className='absolute top-0 left-0 w-3 h-3 bg-custom-red' title='Unconfirmed account' />}
                {user.confirmationStatus && <div className='absolute top-0 left-0 w-3 h-3 bg-custom-yellow' title='Confirmed account' />}
                {/* {validacion && <div className='absolute top-0 left-0 w-3 h-3 bg-custom-green' title='Online one hour ago' />} */}
              </div>
            )}

            <h3 className='mb-5 text-4xl font-bold break-all font-primaryFont'>{user.username}</h3>
            <div className='flex mb-3 items-center h-6 px-2 text-[10px] font-bold text-gray-500 uppercase border-2 border-gray-500  gap-x-1 font-secondaryFont'>
              {user.role === 1 && 'Administrator'}
              {user.role === 2 && 'Project Manager'}
              {user.role === 3 && 'Partner'}
            </div>

            <div className='flex flex-wrap gap-3 mt-4'>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='E-mail'><EnvelopeIcon className='w-4 stroke-2' />{user.email}</div>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='Registration date'><UserIcon className='w-4 stroke-2' />{dayjs(user.registeredAt).format('DD-MM-YYYY')}</div>
            </div>

            <div className='absolute left-0 flex justify-center w-full text-xs font-semibold tracking-widest text-white uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 -top-[0.9rem] xl:opacity-0 gap-x-3 group-hover:opacity-100'>
              <div onClick={() => handleUpdateUserClick(user)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-custom-yellow hover:bg-dark-gray'><PencilSquareIcon className='w-4 stroke-2' /></div>
              <div onClick={() => handleDeleteUserClick(user)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-custom-red hover:bg-dark-gray'><TrashIcon className='w-4 stroke-2' /></div>
            </div>
          </div>
        ))}
      </MasonryGrid>
      <Pagination />
      <GlobalStats />
    </div>
  )
}
