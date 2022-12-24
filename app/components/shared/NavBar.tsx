'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MoonIcon } from '@heroicons/react/24/solid'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Logo from 'app/components/shared/Logo'
import TextLink from 'app/components/shared/TextLink'
import Dropdown from 'app/components/shared/Dropdown'
import Button from 'app/components/shared/Button'
import { useUser } from 'context/UserContext'
import DashboardTab from './DashboardTab'

const PAGES = [
  { name: 'Home', link: '/' },
  { name: 'Features', link: '/' },
  { name: 'Testimonies', link: '/' },
  { name: 'Contact', link: '/' }
]

export default function NavBar (): JSX.Element {
  const router = useRouter()
  const { user } = useUser()

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
          <button><MoonIcon className='w-4 text-black transition ease-in-out duration-400 dark:text-white hover:text-primary dark:hover:text-primary' /></button>
          {user === null
            ? <Button onClick={() => router.push('/login')} variant='primary'>Log in <LockClosedIcon className='w-4 stroke-width-3' /></Button>
            : <DashboardTab user={user} />}
        </div>
      </nav>
    </div>
  )
}
