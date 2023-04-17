'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Headline from 'components/shared/Headline'
import PageTransition from 'components/shared/PageTransition'
import { AppContext } from 'contexts/AppContext'
import Button from 'components/shared/Button'
import Paragraph from 'components/shared/Paragraph'
import { LockClosedIcon, UserMinusIcon, CloudArrowUpIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export default function Profile (): JSX.Element {
  const { user } = useContext(AppContext)
  const router = useRouter()

  return (
    <PageTransition>
      <Headline className='font-bold text-blue' variant='lg'>
        Profile
      </Headline>
      {(user !== null) && (
        <div className='flex flex-col gap-8 xl:w-1/2'>
          <div className='flex flex-col gap-3'>
            <Headline className='!mb-0 text-white' variant='md'>Avatar</Headline>
            <Paragraph className='text-white ' variant='sm'>The recommended dimensions are 256x256 px.</Paragraph>
            <div className='flex flex-col items-start gap-6 xl:flex-row xl:items-center'>
              <Image
                className='object-cover border-4 border-black rounded-full dark:border-white'
                src={user.avatar}
                alt={user.username}
                width={150}
                height={150}
              />
              <div className='relative flex flex-col items-center gap-3 group'>
                <Button variant='primary'><CloudArrowUpIcon className='w-4 stroke-3' /> Upload avatar</Button>
                <div className='absolute invisible opacity-100 md:opacity-0 tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out top-8 bg-light-blue duration-400 group-hover:opacity-100 group-hover:visible rounded-full'>
                  Coming soon
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <Headline className='!mb-0 text-white' variant='md'>Name</Headline>
            <Paragraph className='text-white' variant='normal'>{user.username}</Paragraph>
          </div>

          <div className='flex flex-col gap-3'>
            <Headline className='!mb-0 text-white' variant='md'>Email</Headline>
            <Paragraph className='text-white' variant='normal'>{user.email}</Paragraph>
          </div>

          <div className='flex flex-col items-start gap-4'>
            <div className='relative flex justify-center group'>
              <Button className='!w-auto' variant='primary'><PencilSquareIcon className='w-4 stroke-3' /> Update profile</Button>
              <div className='absolute invisible opacity-100 md:opacity-0 tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out top-8 bg-light-blue duration-400 group-hover:opacity-100 group-hover:visible rounded-full'>
                Coming soon
              </div>
            </div>
            <Button className='!w-auto' variant='primary' onClick={() => router.push('/change-password')}><LockClosedIcon className='w-4 stroke-3' /> Change password</Button>
            <Button className='!w-auto' variant='primary' onClick={() => router.push('/delete-account')}><UserMinusIcon className='w-4 stroke-3' /> Delete account</Button>
          </div>
        </div>
      )}
    </PageTransition>
  )
}
