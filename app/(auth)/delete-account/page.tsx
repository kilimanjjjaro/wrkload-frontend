'use client'

import { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Paragraph from 'app/components/shared/Paragraph'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'
import deleteAccount from 'services/auth/deleteAccount'
import { useRouter } from 'next/navigation'

const INITIAL_CREDENTIALS_STATE = {
  email: '',
  password: ''
}

export default function DeleteAccount (): JSX.Element {
  const router = useRouter()

  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, password } = credentials

    try {
      await deleteAccount({ email, password })
      router.push('/')
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Delete account</b></Headline>
        <div className='flex flex-col mb-4 gap-y-3'>
          <Paragraph variant='sm'>Are you sure to continue? Your account and data will be permanently deleted.</Paragraph>
          <Paragraph variant='sm'><strong>To confirm, complete the following form.</strong></Paragraph>
        </div>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col gap-3 mb-5'>
            <Input variant='primary' onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText />
            <Input variant='primary' onChange={handleChange} value={credentials.password} name='password' type='password' placeholder='Password' autoComplete='current-password' centerText />
          </div>
          <Button variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-width-3' />
          </Button>
        </form>
      </div>
    </div>
  )
}
