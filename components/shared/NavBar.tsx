'use client'

import { useContext, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { getUser } from 'services/users/getUser'
import { DataContext } from 'contexts/DataContext'
import Logo from 'components/shared/Logo'
import Button from 'components/shared/Button'
import DashboardTab from 'components/shared/DashboardTab'

export default function NavBar (): JSX.Element {
  const [showDashboardBox, setShowDashboardBox] = useState(false)
  const { isLogged } = useContext(DataContext)
  const router = useRouter()

  const { data: user, isLoading } = useSWR(isLogged ? 'loggedUser' : null, getUser)

  return (
    <div className='fixed top-0 left-0 z-50 grid items-center justify-between w-full grid-cols-2 px-6 pt-6 mx-auto text md:pt-8 md:px-8'>
      <Link className='flex items-center h-12 md:h-10 justify-self-start' href='/'><Logo /></Link>
      {isLogged && <DashboardTab showDashboardBox={showDashboardBox} setShowDashboardBox={setShowDashboardBox} />}
      <div className='justify-self-end'>
        {(user === undefined && !isLoading) && <Button onClick={() => router.push('/login')} variant='primary'>Log in <LockClosedIcon className='w-4 stroke-3' /></Button>}
        {(user === undefined && isLoading) && (
          <div className='items-center flex gap-x-3 [&>*]:animate-skeleton'>
            <div className='w-36 h-5 bg-gradient-to-r from-light-blue via-blue to-light-blue bg-[length:200%_100%] rounded-full hidden md:block' />
            <div className='w-12 h-12 md:w-10 md:h-10 bg-gradient-to-r from-light-blue via-blue to-light-blue bg-[length:200%_100%] rounded-full' />
          </div>
        )}
        {(user !== undefined && !isLoading) && (
          <div className='flex items-center cursor-pointer justify-self-end group gap-x-3' onClick={() => setShowDashboardBox(!showDashboardBox)}>
            <div className='hidden text-black transition ease-in-out md:block duration-400 dark:text-white group-hover:text-blue dark:group-hover:text-blue font-secondaryFont'>
              Welcome, {user.username}!
            </div>
            <Image
              className='object-cover w-12 h-12 md:w-10 md:h-10 rounded-full transition ease-in-out border-[3px] border-black group-hover:border-blue dark:border-white duration-400 md:group-hover:scale-90 md:dark:group-hover:border-blue'
              src={user.avatar}
              alt={user.username}
              width={40}
              height={40}
            />
          </div>
        )}
      </div>
    </div>
  )
}
