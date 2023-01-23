'use client'

import { useContext } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { getUser } from 'services/users/getUser'
import { DataContext } from 'context/DataContext'
import Logo from 'app/components/shared/Logo'
import Button from 'app/components/shared/Button'
import DashboardTab from 'app/components/shared/DashboardTab'

import { USERS_ENDPOINT as key } from 'constants/users'

export default function NavBar (): JSX.Element {
  const router = useRouter()
  const { isLogged } = useContext(DataContext)

  const { data: user, isLoading } = useSWR(isLogged ? `${key}/_id` : null, getUser)

  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 pt-6 mx-auto text md:pt-8 md:px-8'>
      <Link className='flex items-center h-10' href='/'><Logo /></Link>
      <div className='relative flex items-center h-10'>
        {(user === undefined && isLoading) && (
          <div className='flex items-center gap-x-3 animate-pulse'>
            <div className='w-32 h-5 bg-dark-gray' />
            <div className='w-10 h-10 bg-dark-gray' />
          </div>
        )}
        {(user === undefined && !isLoading) && <Button onClick={() => router.push('/login')} variant='primary'>Log in <LockClosedIcon className='w-4 stroke-3' /></Button>}
        {(user !== undefined && !isLoading) && <DashboardTab user={user} />}
      </div>
    </div>
  )
}
