'use client'

import { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'
import rememberPassword from 'services/auth/rememberPassword'

const INITIAL_CREDENTIALS_STATE = {
  email: ''
}

export default function ForgotPassword (): JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email } = credentials
    try {
      await rememberPassword({ email })
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Forgot password</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col gap-3 mb-5'>
            <Input variant='primary' onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText />
          </div>
          <Button variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-width-3' />
          </Button>
        </form>
      </div>
    </div>
  )
}
