'use client'

import { getCookies } from 'cookies-next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MoonIcon } from '@heroicons/react/24/solid'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Logo from 'app/components/shared/Logo'
import TextLink from 'app/components/shared/TextLink'
import Dropdown from 'app/components/shared/Dropdown'
import Button from 'app/components/shared/Button'
import DashboardTab from 'app/components/shared/DashboardTab'
import useSWR, { Fetcher } from 'swr'
import { useContext } from 'react'
import { DataContext } from 'context/DataContext'
import api from 'utils/api'
import { UserInterface } from 'interfaces/users/User'

const PAGES = [
  { name: 'Home', link: '/' },
  { name: 'Features', link: '/' },
  { name: 'Testimonies', link: '/' },
  { name: 'Contact', link: '/' }
]

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

  const { data } = useSWR(isLogged ? `https://wrkload-api-production.up.railway.app/api/v1/users/${uid as string}` : null, fetcher)

  const user = data?.result

  return (
    <div className='fixed z-50 w-full'>
      <nav className='flex items-center justify-between px-6 py-6 mx-auto md:py-8 md:px-8'>
        <Link className='flex items-center h-12' href='/'><Logo /></Link>
        <div className='items-center hidden h-12 font-normal lg:flex gap-x-10'>
          {
            PAGES.map((page) => (
              <TextLink link={page.link} key={page.name}>{page.name}</TextLink>
            ))
          }
          <Dropdown />
          <button><MoonIcon className='w-4 text-gray-200 transition ease-in-out duration-400 hover:text-white hover:drop-shadow-xl dark:hover:text-primary' /></button>
          {user === undefined
            ? <Button onClick={() => router.push('/login')} variant='primary'>Log in <LockClosedIcon className='w-4 stroke-width-3' /></Button>
            : <DashboardTab user={user} />}
        </div>
      </nav>
    </div>
  )
}
