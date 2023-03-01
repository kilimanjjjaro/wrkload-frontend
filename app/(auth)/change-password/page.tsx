'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import login from 'services/auth/login'
import changePassword from 'services/auth/changePassword'
import PageTransition from 'components/shared/PageTransition'

const INITIAL_CREDENTIALS_STATE = {
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
}

export const metadata = {
  title: 'Change Password'
}

export default function ChangePassword (): JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleClick = (): void => {
    setError('')
    router.refresh()
  }

  const handleStepOne = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    // TODO: get email from logged user
    const { email, currentPassword: password } = credentials

    try {
      await login({ email, password })
      // TODO: handle week password
      // TODO: handle unlogged session
      setStep(2)
    } catch (error: any) {
      if (error.response.data.code === 'auth/invalid-credentials') {
        setError('auth/invalid-credentials')
      }
    }
  }

  const handleStepTwo = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, currentPassword: oldPassword, newPassword, confirmNewPassword } = credentials

    try {
      if (newPassword !== confirmNewPassword) {
        throw new Error('auth/different-passwords')
      }

      const response = await changePassword({ email, oldPassword, newPassword })

      if (response.status === 'ok') {
        setSuccess(true)
      }
    } catch (error: any) {
      if (error.message === 'auth/different-passwords') {
        setError('auth/different-passwords')
        return
      }

      if (error.response.data.code === 'auth/invalid-credentials') {
        setError('auth/invalid-credentials')
      }
    }
  }

  if (error.length >= 1) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>We have a problem!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'>
            <Balancer>
              {error === 'auth/different-passwords' && 'Passwords are not the same. Please, try again.'}
              {error === 'auth/invalid-credentials' && 'The email or password are invalid. Please, try again.'}
            </Balancer>
          </p>
          <Button onClick={handleClick} variant='secondary'>
            <ArrowLeftIcon className='w-4 stroke-3' />
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
          <p className='mb-5 text-sm font-secondaryFont'><Balancer>You can now use your new password. <b>Please, log in again.</b></Balancer></p>
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
          <Headline variant='md'><Balancer>{step === 1 ? 'Change password' : 'Enter new password'}</Balancer></Headline>
          <Paragraph variant='sm'>
            <Balancer>
              If you wish to change your password, <b>please complete the following form.</b>
            </Balancer>
          </Paragraph>
          {step === 1 && (
            <form className='mt-5' onSubmit={(event) => { void handleStepOne(event) }}>
              <div className='flex flex-col gap-3 mb-3'>
                <Input onChange={handleChange} value={credentials.currentPassword} name='currentPassword' type='password' placeholder='Current Password' centerText />
              </div>
              <Button variant='secondary'>
                <ArrowRightIcon className='w-4 stroke-3' />
              </Button>
            </form>
          )}
          {step === 2 && (
            <form className='mt-5' onSubmit={(event) => { void handleStepTwo(event) }}>
              <div className='flex flex-col gap-3 mb-3'>
                <Input onChange={handleChange} value={credentials.newPassword} name='newPassword' type='password' placeholder='New password' autoComplete='new-password' centerText />
                <Input onChange={handleChange} value={credentials.confirmNewPassword} name='confirmNewPassword' type='password' placeholder='Confirm new password' autoComplete='new-password' centerText />
              </div>
              <Button variant='secondary'>
                <ArrowRightIcon className='w-4 stroke-3' />
              </Button>
            </form>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
