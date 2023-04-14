'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import rememberPassword from 'services/auth/rememberPassword'
import PageTransition from 'components/shared/PageTransition'

const INITIAL_CREDENTIALS_STATE = {
  email: ''
}

export default function RememberPassword (): JSX.Element {
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
    const { email } = credentials

    try {
      setIsLoading(true)

      const response = await rememberPassword({ email })

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
              {error === 'trial/permission-denied' && 'This is a trial account, to access this feature you must register.'}
              {error === 'auth/user-not-found' && 'No account associated with this email was found, please try again.'}
            </Balancer>
          </p>
          <Button onClick={() => window.location.reload()} variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-3' />
          </Button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>Done!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'><Balancer>An email has been sent to forgot your password.</Balancer></p>
          <Button onClick={() => router.push('/login')} variant='secondary'>
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
          <Headline variant='md'>Remember password</Headline>
          <Paragraph variant='sm'>
            <Balancer>
              If you forgot your password, <b>please complete the following form.</b>
            </Balancer>
          </Paragraph>
          <form className='mt-5' onSubmit={(event) => { void handleSubmit(event) }}>
            <div className='flex flex-col gap-3 mb-3'>
              <Input onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText required />
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
