'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import { DataContext } from 'contexts/DataContext'

export default function SuccessFeedback (): JSX.Element {
  const { success, setSuccess } = useContext(DataContext)
  const router = useRouter()

  const handleClick = (): void => {
    router.push('/login')
    setSuccess('')
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-80 min-w-auto'>
        <h2 className='text-xl leading-tight mb-7 md:mb-10 font-primaryFont md:text-3xl 2xl:text-4xl'><b>Done!</b></h2>
        <p className='text-sm font-secondaryFont'><Balancer>{success}</Balancer></p>
        {/* <Button onClick={handleClick} variant='secondary'>
          <ArrowRightIcon className='w-4 stroke-3' />
        </Button> */}
      </div>
    </div>
  )
}
