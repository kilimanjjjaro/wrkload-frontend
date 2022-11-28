'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'

export default function RemberPassword (): JSX.Element {
  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Remember password</b></Headline>
        <form>
          <div className='flex flex-col gap-3 mb-5'>
            <Input type='email' placeholder='Email' autoComplete='email' centerText />
          </div>
          <Button variant='secondary' onClick={() => { throw new Error('¡Ups!') }}>
            <ArrowRightIcon className='w-4 stroke-width-3' />
          </Button>
        </form>
      </div>
    </div>
  )
}
