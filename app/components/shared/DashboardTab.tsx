'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const PAGES = [
  { name: 'Tasks', link: '/tasks' },
  { name: 'Projects', link: '/projects' },
  { name: 'Users', link: '/users' },
  { name: 'Profile', link: '/' },
  { name: 'Log out', link: '/login' }
]

export default function DashboardTab (): JSX.Element {
  const [showBox, setShowBox] = useState(false)

  const user = {
    username: 'kilimanjjjaro',
    avatar: '/images/testimony.jpg'
  }

  return (
    <div className='relative'>
      <div className='flex items-center cursor-pointer group gap-x-3' onClick={() => setShowBox(!showBox)}>
        <div className='text-black transition duration-500 ease-in-out dark:text-white group-hover:text-primary dark:group-hover:text-primary font-secondaryFont'>{user.username}</div>
        <div className='relative flex justify-center'>
          <Image
            className='object-cover w-12 h-12 transition duration-500 ease-in-out border-4 border-black rounded-full group-hover:scale-90 group-hover:border-primary'
            src={user.avatar}
            alt={user.username}
            width={40}
            height={40}
          />
        </div>
      </div>
      <Transition
        className='absolute right-0 top-[59px]'
        show={showBox}
        enter='transition duration-500 ease-in-out'
        enterFrom='opacity-0 translate-x-20'
        enterTo='opacity-100 translate-x-0'
        leave='transition duration-500 ease-in-out'
        leaveFrom='opacity-100 translate-x-0'
        leaveTo='opacity-0 translate-x-20'
      >
        <div className='relative flex items-center'>
          <ul className='flex flex-col items-end self-start font-semibold text-black transition duration-500 ease-in-out gap-y-1 dark:bg-primary p-7 rounded-3xl dark:text-black font-secondaryFont'>
            {PAGES.map((page) => (
              <li className='transition duration-500 ease-in-out hover:-translate-x-1' key={page.link}><Link href={page.link}>{page.name}</Link></li>
            ))}
          </ul>
          <div className='absolute w-8 p-2 transition duration-500 ease-in-out bg-white rounded-full cursor-pointer top-50 -left-12 hover:bg-primary'>
            <XMarkIcon className='stroke-width-2 stroke-black' onClick={() => setShowBox(!showBox)} />
          </div>
        </div>
      </Transition>
    </div>
  )
}
