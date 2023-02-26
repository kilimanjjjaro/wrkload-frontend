'use client'

import { useContext } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { getUser } from 'services/users/getUser'
import { DataContext } from 'contexts/DataContext'
import Logo from 'components/shared/Logo'
import Button from 'components/shared/Button'
import DashboardTab from 'components/shared/DashboardTab'

export default function NavBar (): JSX.Element {
  const router = useRouter()
  const { isLogged } = useContext(DataContext)

  const { data: user, isLoading } = useSWR(isLogged ? 'loggedUser' : null, getUser)

  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 pt-6 mx-auto text md:pt-8 md:px-8'>
      <Link className='flex items-center h-12 md:h-10' href='/'><Logo /></Link>
      <div className='relative flex items-center h-12 md:h-10'>
        {(user === undefined && isLoading) && (
          <div className='items-center hidden md:flex gap-x-3 animate-skeleton'>
            <div className='w-32 h-5 bg-gradient-to-r from-blue via-light-blue to-blue bg-[length:200%_100%]' />
            <div className='w-12 h-12 md:w-10 md:h-10 bg-gradient-to-r from-blue via-light-blue to-blue bg-[length:200%_100%]' />
          </div>
        )}
        {(user === undefined && !isLoading) && <Button onClick={() => router.push('/login')} variant='primary'>Log in <LockClosedIcon className='w-4 stroke-3' /></Button>}
        {(user !== undefined && !isLoading) && <DashboardTab user={user} />}
      </div>
    </div>
  )
}
