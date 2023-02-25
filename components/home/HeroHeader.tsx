'use client'

import { useRouter } from 'next/navigation'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Button from 'components/shared/Button'

export default function HeroHeader (): JSX.Element {
  const router = useRouter()

  return (
    <div className='grid items-center h-screen grid-cols-2 gap-10'>
      <div className='flex flex-col items-start text-black transition-colors ease-in-out dark:text-blue duration-400'>
        <Headline variant='2xl'>Work, load your <br />time and go <br />have fun!</Headline>
        <div className='mb-8 dark:text-white md:w-1/2'>
          <Paragraph variant='normal'><b className='font-extrabold'>Easy-peasy!</b></Paragraph>
          <Paragraph variant='normal'>With wrkload you can track what you&apos;ve worked on in a simple and organized way.</Paragraph>
        </div>
        <Button variant='primary' onClick={() => router.push('/registry')}>Start now for free <ArrowRightIcon className='w-4 stroke-3' /></Button>
      </div>
      <div className='w-full bg-black dark:bg-blue h-2/3' />
    </div>
  )
}
