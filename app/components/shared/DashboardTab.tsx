import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { UserContext } from 'context/UserContext'

const PAGES = [
  { name: 'Tasks', link: '/tasks' },
  { name: 'Projects', link: '/projects' },
  { name: 'Users', link: '/users' },
  { name: 'Profile', link: '/' },
  { name: 'Log out', link: '/login' }
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

export default function DashboardTab (): JSX.Element {
  const { user } = useContext(UserContext)
  const [showBox, setShowBox] = useState(false)

  return (
    <div className='relative'>
      <div className='flex items-center cursor-pointer group gap-x-3' onClick={() => setShowBox(!showBox)}>
        <div className='text-black transition ease-in-out duration-400 dark:text-white group-hover:text-primary dark:group-hover:text-primary font-secondaryFont'>{user.username}</div>
        <div className='relative flex justify-center'>
          <Image
            className='object-cover w-12 h-12 transition ease-in-out border-4 border-black rounded-full duration-400 group-hover:scale-90 group-hover:border-primary'
            src={user.avatar}
            alt={user.username}
            width={40}
            height={40}
          />
        </div>
      </div>
      <motion.div
        className='absolute right-0 top-[59px]'
        animate={showBox ? 'open' : 'closed'}
        variants={VARIANTS}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        initial={false}
      >
        <div className='relative flex items-center'>
          <ul className='flex flex-col items-end self-start text-black transition ease-in-out duration-400 gap-y-1 dark:bg-primary p-7 rounded-3xl dark:text-black font-secondaryFont'>
            {PAGES.map((page) => (
              <li className='transition ease-in-out duration-400 hover:-translate-x-1' key={page.link} onClick={() => setShowBox(!showBox)}><Link href={page.link}>{page.name}</Link></li>
            ))}
          </ul>
          <div className='absolute w-8 p-2 transition ease-in-out bg-white rounded-full cursor-pointer duration-400 top-50 -left-12 hover:bg-primary' onClick={() => setShowBox(!showBox)}>
            <XMarkIcon className='stroke-width-2 stroke-black' />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
