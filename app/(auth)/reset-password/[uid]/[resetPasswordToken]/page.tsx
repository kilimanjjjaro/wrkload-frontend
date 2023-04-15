'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import resetPassword from 'services/auth/resetPassword'
import PageTransition from 'components/shared/PageTransition'

interface ParamsInterface {
  params: {
    uid: string
    resetPasswordToken: string
  }
}

const INITIAL_CREDENTIALS_STATE = {
  newPassword: '',
  confirmNewPassword: ''
}

export default function ResetPassword ({ params }: ParamsInterface): JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleClick = (): void => {
    setError('')

    if (error === 'auth/different-passwords') {
      router.refresh()
    }

    if (error === 'token/token-expired') {
      router.push('/remember-password')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { newPassword, confirmNewPassword } = credentials
    const { uid, resetPasswordToken } = params

    try {
      setIsLoading(true)

      if (newPassword !== confirmNewPassword) {
        throw new Error('auth/different-passwords')
      }

      const response = await resetPassword({ newPassword, uid, resetPasswordToken })

      if (response.status === 'ok') {
        setSuccess(true)
      }
    } catch (error: any) {
      if (error.message === 'auth/different-passwords') {
        setError('auth/different-passwords')
        return
      }

      if (error.response.data.code.length >= 1) {
        setError(error.response.data.code)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (error.length >= 1) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>We have a problem!</Balancer></Headline>
          <p
            className={clsx(
              'text-sm font-secondaryFont',
              (error === 'auth/different-passwords' || error === 'token/token-expired') && 'md:mb-5'
            )}
          >
            <Balancer>
              {error === 'trial/permission-denied' && 'This is a trial account, to access this feature you must register.'}
              {error === 'auth/different-passwords' && 'Passwords are not the same. Please, try again.'}
              {error === 'token/token-expired' && 'Sorry, the reset password link has expired. Please request one again.'}
              {error === 'token/token-not-found' && 'Invalid link. Please, try again with the one that we sent you.'}
            </Balancer>
          </p>
          {(error === 'auth/different-passwords' || error === 'token/token-expired') && (
            <Button onClick={handleClick} variant='secondary'>
              <ArrowLeftIcon className='w-4 stroke-3' />
            </Button>
          )}
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
          <Headline variant='md'><Balancer>Reset password</Balancer></Headline>
          <Paragraph variant='sm'>
            <Balancer>
              To reset your password, <b>please complete the following form.</b>
            </Balancer>
          </Paragraph>
          <form className='mt-5' onSubmit={(event) => { void handleSubmit(event) }}>
            <div className='flex flex-col gap-3 mb-3'>
              <div className='relative flex items-center'>
                <Input onChange={handleChange} value={credentials.newPassword} name='newPassword' type='password' placeholder='New password' minLength={8} centerText required />
                <div className={clsx(
                  'absolute flex items-center gap-x-1 right-3 pt-[2px]',
                  credentials.newPassword.length > 0 && credentials.newPassword.length < 8 && '[&>div]:!bg-red',
                  credentials.newPassword.length >= 7 && credentials.newPassword.length < 12 && '[&>div]:!bg-yellow',
                  credentials.newPassword.length >= 11 && '[&>div]:!bg-green'
                )}
                >
                  {credentials.newPassword.length > 0 && <div className='w-[5px] h-[5px] rounded-full' />}
                  {credentials.newPassword.length >= 7 && <div className='w-[5px] h-[5px] rounded-full' />}
                  {credentials.newPassword.length >= 11 && <div className='w-[5px] h-[5px] rounded-full' />}
                </div>
              </div>
              <div className='relative flex items-center'>
                <Input onChange={handleChange} value={credentials.confirmNewPassword} name='confirmNewPassword' type='password' placeholder='Confirm new password' minLength={8} centerText required />
                <div className='absolute flex items-center gap-x-1 right-3'>
                  {credentials.confirmNewPassword.length > 7 && credentials.confirmNewPassword === credentials.newPassword && (
                    <svg className='w-[12px] h-[12px] stroke-green' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' strokeWidth='3' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                    </svg>
                  )}

                  {credentials.confirmNewPassword.length > 7 && credentials.confirmNewPassword !== credentials.newPassword && (
                    <svg className='w-[12px] h-[12px] stroke-red' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  )}
                </div>
              </div>
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
