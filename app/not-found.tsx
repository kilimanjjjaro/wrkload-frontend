'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import Headline from 'components/shared/Headline'
import notFoundImage from 'public/images/not-found.webp'
import Paragraph from 'components/shared/Paragraph'

export default function NotFound (): JSX.Element {
  const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center mx-auto mt-36 xl:w-1/3 2xl:mt-52 gap-y-5 '>
      <Headline className='font-bold text-center text-blue' variant='xl'>Page Not Found</Headline>
      <Image
        className='w-72'
        src={notFoundImage}
        alt='Not found image'
      />
      <Paragraph className='text-white' variant='normal'><Balancer>Sorry, we couldn&apos;t find what you were looking for, please try again.</Balancer></Paragraph>
      <Button className='!w-auto' onClick={() => router.back()} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /></Button>
    </div>
  )
}
