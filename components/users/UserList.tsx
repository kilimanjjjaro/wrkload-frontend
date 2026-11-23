import { useContext } from 'react'
import dayjs from 'dayjs'
import { EnvelopeIcon, PencilSquareIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline'
import Pagination from 'components/shared/Pagination'
import MasonryGrid from 'components/shared/MasonryGrid'
import Headline from 'components/shared/Headline'
import { AppContext } from 'contexts/AppContext'
import { ModalsContext } from 'contexts/ModalsContext'
import type { FullUserInterface, UserInterface } from 'interfaces/users/User'
import UserAvatar from 'components/users/UserAvatar'
import RoleLabel from 'components/users/RoleLabel'

interface Props {
  data: FullUserInterface
  isTrialAccount: boolean
}

export default function UserList ({ data, isTrialAccount }: Props): React.JSX.Element {
  const { setSelectedUser } = useContext(AppContext)
  const { setUpdateDataModalStatus, setDeleteDataModalStatus } = useContext(ModalsContext)

  const handleUpdateUserClick = (user: UserInterface): void => {
    setSelectedUser(user)
    setUpdateDataModalStatus(true)
  }

  const handleDeleteUserClick = (user: UserInterface): void => {
    setSelectedUser(user)
    setDeleteDataModalStatus(true)
  }

  let { users } = data
  const { pagination } = data
  const trialAccountId = '6439b01cf35b6e22570cd842'

  if (isTrialAccount) users = users.filter((user) => user._id === trialAccountId)

  return (
    <>
      <MasonryGrid>
        {users.map((user) => (
          <article
            key={user._id} className='relative flex flex-col items-start p-6 text-black wrap-break-word transition ease-in-out bg-light-blue dark:bg-white rounded-3xl duration-400 group md:p-7'
          >
            <UserAvatar user={user} />

            <Headline variant='md' className='mb-2!'>{user.username}</Headline>
            <div className='flex mb-3 rounded-full items-center h-6 px-2 text-[10px] font-bold text-black uppercase border-2 border-black gap-x-1 font-secondaryFont'>
              <RoleLabel user={user} trialAccountId={trialAccountId} />
            </div>

            <div className='flex flex-wrap gap-3 mt-4'>
              <div className='relative flex items-center justify-center h-8 px-4 text-xs text-black rounded-full group/tooltip-1 bg-blue gap-x-1 font-secondaryFont'>
                <EnvelopeIcon className='w-4 stroke-2' />
                {user.email}
                <div className='absolute invisible tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out opacity-0 top-7 bg-white dark:bg-light-blue duration-400 group-hover/tooltip-1:opacity-100 group-hover/tooltip-1:visible rounded-full'>
                  E-mail
                </div>
              </div>
              <div className='relative flex items-center justify-center h-8 px-4 text-xs text-black rounded-full group/tooltip-2 bg-blue gap-x-1 font-secondaryFont'>
                <UserIcon className='w-4 stroke-2' />
                {dayjs(user.registeredAt).format('DD-MM-YYYY')}
                <div className='absolute invisible tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out opacity-0 top-7 bg-white dark:bg-light-blue duration-400 group-hover/tooltip-2:opacity-100 group-hover/tooltip-2:visible rounded-full'>
                  Registration date
                </div>
              </div>
            </div>

            <div className='absolute right-6 md:right-0 flex flex-col md:flex-row items-end justify-end md:justify-center md:w-full text-xs font-semibold tracking-widest text-black uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 md:top-[-0.9rem] xl:opacity-0 gap-2 md:gap-3 group-hover:opacity-100'>
              <div onClick={() => { handleUpdateUserClick(user); }} className='flex items-center justify-center w-8 h-8 transition ease-in-out rounded-full cursor-pointer duration-400 bg-yellow hover:bg-blue'><PencilSquareIcon className='w-4 stroke-2' /></div>
              <div onClick={() => { handleDeleteUserClick(user); }} className='flex items-center justify-center w-8 h-8 transition ease-in-out rounded-full cursor-pointer duration-400 bg-red hover:bg-blue'><TrashIcon className='w-4 stroke-2' /></div>
            </div>
          </article>
        ))}
      </MasonryGrid>
      <Pagination data={pagination} />
    </>
  )
}
