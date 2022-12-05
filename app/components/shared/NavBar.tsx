'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MoonIcon } from '@heroicons/react/24/solid'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Logo from 'app/components/shared/Logo'
import TextLink from 'app/components/shared/TextLink'
import Dropdown from 'app/components/shared/Dropdown'
import Button from 'app/components/shared/Button'
import DashboardTab from 'app/components/shared/DashboardTab'

const PAGES = [
  { name: 'Home', link: '/' },
  { name: 'Features', link: '/' },
  { name: 'Testimonies', link: '/' },
  { name: 'Contact', link: '/' }
]

export default function NavBar (): JSX.Element {
  const [isLogged, setIsLogged] = useState(true)

  const router = useRouter()

  return (
    <div className='bg-white dark:bg-black'>
      <nav className='container flex items-center justify-between px-6 mx-auto py-7 md:py-10 md:px-8'>
        <Link href='/'><Logo /></Link>
        <div className='items-center hidden font-normal lg:flex gap-x-10'>
          {
              PAGES.map((page) => (
                <TextLink link={page.link} key={page.name}>{page.name}</TextLink>
              ))
            }
          <Dropdown />
          <button><MoonIcon className='w-4 text-black transition duration-400 ease-in-out dark:text-white hover:text-primary dark:hover:text-primary' /></button>
          {!isLogged
            ? <Button onClick={() => router.push('/login')} variant='primary'>Log in <LockClosedIcon className='w-4 stroke-width-3' /></Button>
            : <DashboardTab />}
        </div>
      </nav>
    </div>
  )
}
