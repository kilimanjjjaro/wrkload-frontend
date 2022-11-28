'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Paragraph from 'app/components/shared/Paragraph'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'

export default function DeleteAccount (): JSX.Element {
  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Delete account</b></Headline>
        <div className='flex flex-col mb-4 gap-y-3'>
          <Paragraph variant='sm'>Are you sure to continue? Your account and data will be permanently deleted.</Paragraph>
          <Paragraph variant='sm'><strong>To confirm, complete the following form.</strong></Paragraph>
        </div>
        <form>
          <div className='flex flex-col gap-3 mb-5'>
            <Input type='email' placeholder='Email' autoComplete='email' centerText />
            <Input type='password' placeholder='Password' autoComplete='current-password' centerText />
          </div>
          <Button variant='secondary' onClick={() => { throw new Error('¡Ups!') }}>
            <ArrowRightIcon className='w-4 stroke-width-3' />
          </Button>
        </form>
      </div>
    </div>
  )
}
