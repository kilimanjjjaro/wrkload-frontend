'use client'

import { useRouter } from 'next/navigation'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Paragraph from 'app/components/shared/Paragraph'
import Button from 'app/components/shared/Button'

export default function HeroHeader (): JSX.Element {
  const router = useRouter()

  return (
    <div className='grid items-center h-screen grid-cols-2 gap-10 text-black'>
      <div className='flex flex-col items-start text-white justify-cente'>
        <Headline variant='2xl'>Work, load your <br />time and go <br />have fun!</Headline>
        <div className='mb-8 md:w-1/2'>
          <Paragraph variant='normal'><b className='font-extrabold'>Easy-peasy!</b><br /> With wrkload you can track what you work on in a simple and organized way.</Paragraph>
        </div>
        <Button variant='primary' onClick={() => router.push('/registry')}>Start now for free <ArrowRightIcon className='w-4 stroke-3' /></Button>
      </div>
      <div className='w-full bg-dark-gray h-2/3' />
    </div>
  )
}
