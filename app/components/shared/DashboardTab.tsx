
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { deleteCookie } from 'cookies-next'
import { useContext, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import api from 'utils/api'
import { DataContext } from 'context/DataContext'
import { UserInterface } from 'interfaces/users/User'

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
    deleteCookie('uid')
    deleteCookie('accessToken')
    setIsLogged(false)
    router.push('/login')
  }

  return (
    <div className='relative'>
      <div className='flex items-center cursor-pointer group gap-x-3' onClick={() => setShowBox(!showBox)}>
        <div className='text-white transition ease-in-out duration-400 dark:text-white group-hover:text-white dark:group-hover:text-primary font-secondaryFont'>{user.username}</div>
        <Image
          className='object-cover w-12 h-12 transition ease-in-out border-4 border-white --full duration-400 group-hover:scale-90 group-hover:border-white dark:group-hover:border-primary'
          src={user.avatar}
          alt={user.username}
          width={40}
          height={40}
        />
      </div>
      <motion.div
        className='absolute right-0 top-[59px]'
        animate={showBox ? 'open' : 'closed'}
        variants={VARIANTS}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        initial={false}
      >
        <div className='relative flex items-center'>
          <ul className='flex flex-col items-end self-start transition ease-in-out bg-white text-dark-gray duration-400 gap-y-1 dark:bg-primary p-7 --3xl dark:text-black font-secondaryFont'>
            {PAGES.map((page) => (
              <li className='transition ease-in-out duration-400 hover:-translate-x-1' key={page.link} onClick={() => setShowBox(!showBox)}><Link href={page.link}>{page.name}</Link></li>
            ))}
            <button className='transition ease-in-out duration-400 hover:-translate-x-1' onClick={async () => await handleLogout()}>Log out</button>
          </ul>
          <div className='absolute w-8 p-2 transition ease-in-out bg-white --full cursor-pointer dark:hover:bg-primary dark:bg-white duration-400 top-50 -left-12 hover:bg-white' onClick={() => setShowBox(!showBox)}>
            <XMarkIcon className='stroke-width-2 stroke-dark-gray dark:stroke-black' />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
