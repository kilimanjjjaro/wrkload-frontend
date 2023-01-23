
import { useContext, useState } from 'react'
import { deleteCookie } from 'cookies-next'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import api from 'utils/api'
import { DataContext } from 'context/DataContext'
import { clearCache } from 'services/clearCache'

import type { UserInterface } from 'interfaces/users/User'

const PAGES = [
  { name: 'Tasks', link: '/tasks' },
  { name: 'Projects', link: '/projects' },
  { name: 'Users', link: '/users' }
]

const VARIANTS = {
  open: { opacity: 1, x: 0, display: 'block' },
  closed: {
    opacity: 0,
    x: 40,
    transitionEnd: {
      display: 'none'
    }
  }
}

export default function DashboardTab ({ user }: { user: UserInterface }): JSX.Element {
  const router = useRouter()
  const { setIsLogged } = useContext(DataContext)
  const [showBox, setShowBox] = useState(false)

  const handleLogout = async (): Promise<void> => {
    await api.get('/auth/logout')
    await clearCache()
    deleteCookie('_id')
    deleteCookie('accessToken')
    setIsLogged(false)
    router.push('/login')
  }

  return (
    <>
      <div className='flex items-center cursor-pointer group gap-x-3' onClick={() => setShowBox(!showBox)}>
        <div className='transition ease-in-out text-dark-gray duration-400 dark:text-white group-hover:text-white dark:group-hover:text-primary font-secondaryFont'>Welcome, {user.username}!</div>
        <Image
          className='object-cover w-10 h-10 transition ease-in-out border-4 border-dark-gray duration-400 group-hover:scale-90 group-hover:border-white dark:group-hover:border-primary'
          src={user.avatar}
          alt={user.username}
          width={40}
          height={40}
        />
      </div>
      <motion.div
        className='absolute right-0 top-[57px]'
        animate={showBox ? 'open' : 'closed'}
        variants={VARIANTS}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        initial={false}
      >
        <nav className='relative flex items-center'>
          <ul className='flex flex-col items-end self-start transition ease-in-out bg-white p-7 text-dark-gray duration-400 gap-y-1 font-secondaryFont'>
            {PAGES.map((page) => (
              <li className='transition ease-in-out duration-400 hover:-translate-x-1' key={page.link} onClick={() => setShowBox(!showBox)}><Link href={page.link}>{page.name}</Link></li>
            ))}
            <button className='transition ease-in-out duration-400 hover:-translate-x-1' onClick={() => { void handleLogout() }}>Log out</button>
          </ul>
          <div className='absolute w-8 p-2 transition ease-in-out bg-white cursor-pointer top-50 -left-12 group duration-400 hover:bg-dark-gray' onClick={() => setShowBox(!showBox)}>
            <XMarkIcon className='stroke-width-2 stroke-dark-gray group-hover:stroke-white' />
          </div>
        </nav>
      </motion.div>
    </>
  )
}
