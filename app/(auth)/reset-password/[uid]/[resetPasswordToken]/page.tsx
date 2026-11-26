'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import resetPassword from 'services/auth/resetPassword'
import PageTransition from 'components/shared/PageTransition'
import { SERVER_RESPONSE_STATUS } from 'constants/components'
import { commonErrorMessage, errorCode } from 'utils/errors'
import { MIN_LENGTH } from 'constants/math'
import PasswordStrength from 'components/shared/PasswordStrength'
import PasswordMatch from 'components/shared/PasswordMatch'

const INITIAL_CREDENTIALS_STATE = {
  newPassword: '',
  confirmNewPassword: ''
}

const ERROR_MESSAGES: Partial<Record<string, string>> = {
  'trial/permission-denied':
    'This is a trial account, to access this feature you must register.',
  'auth/different-passwords': 'Passwords are not the same. Please, try again.',
  'token/token-expired':
    'Sorry, the reset password link has expired. Please request one again.',
  'token/token-not-found':
    'Invalid link. Please, try again with the one that we sent you.'
}

export default function ResetPassword(): React.JSX.Element {
  const params = useParams<{ uid: string; resetPasswordToken: string }>()
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

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const { newPassword, confirmNewPassword } = credentials
    const { uid, resetPasswordToken } = params

    try {
      setIsLoading(true)

      if (newPassword !== confirmNewPassword) {
        throw new Error('auth/different-passwords')
      }

      const response = await resetPassword({
        newPassword,
        uid,
        resetPasswordToken
      })

      if (response.status === SERVER_RESPONSE_STATUS.OK) {
        setSuccess(true)
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'auth/different-passwords'
      ) {
        setError('auth/different-passwords')
        return
      }

      setError(errorCode(error))
    } finally {
      setIsLoading(false)
    }
  }

  if (error.length >= MIN_LENGTH) {
    const canTryAgain =
      error === 'auth/different-passwords' ||
      error === 'token/token-expired' ||
      ERROR_MESSAGES[error] === undefined

    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'>
            <Balancer>We have a problem!</Balancer>
          </Headline>
          <p
            className={clsx(
              'text-sm font-secondaryFont',
              canTryAgain && 'md:mb-5'
            )}
          >
            <Balancer>
              {ERROR_MESSAGES[error] ?? commonErrorMessage(error)}
            </Balancer>
          </p>
          {canTryAgain && (
            <Button
              ariaLabel='Try again'
              onClick={handleClick}
              variant='secondary'
            >
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
          <Headline variant='md'>
            <Balancer>Done!</Balancer>
          </Headline>
          <p className='mb-5 text-sm font-secondaryFont'>
            <Balancer>
              You can now use your new password. <b>Please, log in again.</b>
            </Balancer>
          </p>
          <Button
            ariaLabel='Login'
            onClick={() => {
              router.push('/login')
            }}
            variant='secondary'
          >
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
          <Headline variant='md'>
            <Balancer>Reset password</Balancer>
          </Headline>
          <Paragraph variant='sm'>
            <Balancer>
              To reset your password, <b>please complete the following form.</b>
            </Balancer>
          </Paragraph>
          <form
            className='mt-5'
            onSubmit={(event) => {
              void handleSubmit(event)
            }}
          >
            <div className='flex flex-col gap-3 mb-3'>
              <div className='relative flex items-center'>
                <Input
                  onChange={handleChange}
                  value={credentials.newPassword}
                  name='newPassword'
                  type='password'
                  placeholder='New password'
                  minLength={8}
                  centerText
                  required
                />
                <PasswordStrength password={credentials.newPassword} />
              </div>
              <div className='relative flex items-center'>
                <Input
                  onChange={handleChange}
                  value={credentials.confirmNewPassword}
                  name='confirmNewPassword'
                  type='password'
                  placeholder='Confirm new password'
                  minLength={8}
                  centerText
                  required
                />
                <PasswordMatch
                  password={credentials.newPassword}
                  confirmation={credentials.confirmNewPassword}
                />
              </div>
            </div>
            <Button
              ariaLabel='Submit'
              variant='secondary'
              isLoading={isLoading}
            >
              <ArrowRightIcon className='w-4 stroke-3' />
            </Button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}
