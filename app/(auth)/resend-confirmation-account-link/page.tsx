'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import resendConfirmationAccountLink from 'services/auth/resendConfirmationAccountLink'

const INITIAL_CREDENTIALS_STATE = {
  email: ''
}

export default function ResendConfirmationAccountLink (): JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email } = credentials

    try {
      const response = await resendConfirmationAccountLink({ email })

      if (response.status === 'ok') {
        setSuccess(true)
      }
    } catch (error: any) {
      setError(error.response.data.code)
    }
  }

  if (error.length >= 1) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-10 text-center text-black bg-blue md:w-80 min-w-auto'>
          <Headline variant='md'><Balancer>We have a problem!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'>
            <Balancer>
              {error === 'auth/user-not-found' && 'No account associated with this email was found, please try again.'}
              {error === 'auth/account-already-confirmed' && 'This account has already been confirmed, please try log in.'}
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
        <div className='p-10 text-center text-black bg-blue md:w-80 min-w-auto'>
          <Headline variant='md'><Balancer>Done!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'><Balancer>A link to confirm the account was sent again, <b>please check your inbox.</b></Balancer></p>
          <Button onClick={() => router.push('/login')} variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-3' />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-black bg-blue md:w-96 min-w-auto'>
        <Headline variant='md'><Balancer>Resend confirmation account link</Balancer></Headline>
        <Paragraph variant='sm'>
          <Balancer>
            If the link to confirm your account has expired, <b>please complete the following form and we will send you a new one.</b>
          </Balancer>
        </Paragraph>
        <form className='mt-5' onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col gap-3 mb-5'>
            <Input variant='primary' onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText />
          </div>
          <Button variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-3' />
          </Button>
        </form>
      </div>
    </div>
  )
}
