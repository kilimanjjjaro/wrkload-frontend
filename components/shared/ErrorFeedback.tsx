'use client'

import { useContext } from 'react'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import { DataContext } from 'contexts/DataContext'

export default function ErrorFeedback (): JSX.Element {
  const { error, setError } = useContext(DataContext)

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-80 min-w-auto'>
        <h2 className='text-xl leading-tight mb-7 md:mb-10 font-primaryFont md:text-3xl 2xl:text-4xl'><b>We have a problem!</b></h2>
        <p className='text-sm md:mb-5 font-secondaryFont'><Balancer>{error}</Balancer></p>
        <Button onClick={() => setError('')} variant='secondary'>
          <ArrowLeftIcon className='w-4 stroke-3' />
        </Button>
      </div>
    </div>
  )
}
