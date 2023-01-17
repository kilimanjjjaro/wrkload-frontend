'use client'

import { getCookies } from 'cookies-next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Logo from 'app/components/shared/Logo'
import Button from 'app/components/shared/Button'
import DashboardTab from 'app/components/shared/DashboardTab'
import useSWR, { Fetcher } from 'swr'
import { useContext } from 'react'
import { DataContext } from 'context/DataContext'
import api from 'utils/api'
import { UserInterface } from 'interfaces/users/User'

interface FetcherInterface {
  result: UserInterface
}

export default function NavBar (): JSX.Element {
  const router = useRouter()
  const { uid, accessToken } = getCookies()
  const { isLogged } = useContext(DataContext)

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const fetcher: Fetcher<FetcherInterface> = async (url: string) => await api.get(url, options).then(res => res.data)

  const { data, isValidating, isLoading } = useSWR(isLogged ? `https://wrkload-api-production.up.railway.app/api/v1/users/${uid as string}` : null, fetcher)

  const user = data?.result

  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 pt-6 mx-auto text md:pt-8 md:px-8'>
      <Link className='flex items-center h-10' href='/'><Logo /></Link>
      <div className='relative flex items-center h-10'>
        {(isLoading || isValidating) && (
          <div className='flex items-center gap-x-3 animate-pulse'>
            <div className='w-32 h-5 bg-dark-gray' />
            <div className='w-10 h-10 bg-dark-gray' />
          </div>
        )}
        {(user === undefined && !isValidating) && <Button onClick={() => router.push('/login')} variant='primary'>Log in <LockClosedIcon className='w-4 stroke-width-3' /></Button>}
        {(user !== undefined && !isValidating) && <DashboardTab user={user} />}
      </div>
    </div>
  )
}
