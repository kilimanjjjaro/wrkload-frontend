'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import PageTransition from 'components/shared/PageTransition'
import deleteAccount from 'services/auth/deleteAccount'

const INITIAL_CREDENTIALS_STATE = {
  email: '',
  password: ''
}

export default function DeleteAccount (): JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, password } = credentials

    try {
      setIsLoading(true)
      const response = await deleteAccount({ email, password })

      if (response.status === 'ok') {
        setSuccess(true)
      }
    } catch (error: any) {
      setError(error.response.data.code)
    } finally {
      setIsLoading(false)
    }
  }

  if (error.length >= 1) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>We have a problem!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'>
            <Balancer>
              {error === 'auth/invalid-credentials' && 'The email or password are invalid. Please, try again.'}
              {error === 'auth/account-not-confirmed' && 'This account has not been confirmed yet. Please, do this first.'}
            </Balancer>
          </p>
          <Button onClick={() => router.push('/login')} variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-3' />
          </Button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-black md:p-10 text-cente bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>Done!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'><Balancer>Your account was deleted. <b>Thanks for this time!</b></Balancer></p>
          <Button onClick={() => router.push('/')} variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-3' />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-96 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>Delete account</Balancer></Headline>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Paragraph variant='sm'>Are you sure to continue? Your account and data will be permanently deleted. <b>To confirm, complete the following form.</b></Paragraph>
          </div>
          <form onSubmit={(event) => { void handleSubmit(event) }}>
            <div className='flex flex-col gap-3 mb-3'>
              <Input onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' centerText required />
              <Input onChange={handleChange} value={credentials.password} name='password' type='password' placeholder='Password' centerText required />
            </div>
            <Button variant='secondary' isLoading={isLoading}>
              <ArrowRightIcon className='w-4 stroke-3' />
            </Button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}
