'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAxiosError } from 'axios'
import Balancer from 'react-wrap-balancer'
import { getCookie } from 'cookies-next/client'
import { jwtDecode } from 'jwt-decode'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import PageTransition from 'components/shared/PageTransition'
import login from 'services/auth/login'
import changePassword from 'services/auth/changePassword'
import logout from 'services/auth/logout'
import { SERVER_RESPONSE_STATUS } from 'constants/components'
import { commonErrorMessage, errorCode } from 'utils/errors'
import type { ApiErrorData } from 'utils/errors'
import { FIRST_INDEX, MIN_LENGTH } from 'constants/math'
import PasswordStrength from 'components/shared/PasswordStrength'
import PasswordMatch from 'components/shared/PasswordMatch'

const FIRST_STEP = 1
const SECOND_STEP = 2

const INITIAL_CREDENTIALS_STATE = {
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
}

const ERROR_MESSAGES: Partial<Record<string, string>> = {
  'trial/permission-denied':
    'This is a trial account, to access this feature you must register.',
  'auth/different-passwords': 'Passwords are not the same. Please, try again.',
  'auth/invalid-credentials':
    'The email or password are invalid. Please, try again.',
  'auth/expired-session':
    'Your session has expired. Please, log in again to change your password.'
}

export default function ChangePassword(): React.JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)
  const [step, setStep] = useState(FIRST_STEP)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const accessToken = getCookie('accessToken')
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleClick = (): void => {
    setError('')
    router.refresh()
  }

  const email =
    accessToken === undefined
      ? ''
      : jwtDecode<{ email: string }>(accessToken).email

  const handleStepOne = async (
    event: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const { currentPassword: password } = credentials

    try {
      setIsLoading(true)

      await login({ email, password })
      // TODO: handle week password
      // TODO: handle unlogged session
      setStep(SECOND_STEP)
    } catch (error) {
      if (
        isAxiosError<ApiErrorData>(error) &&
        error.response?.data.error?.[FIRST_INDEX].param === 'email'
      ) {
        setError('auth/expired-session')
        return
      }

      setError(errorCode(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleStepTwo = async (
    event: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    const {
      currentPassword: oldPassword,
      newPassword,
      confirmNewPassword
    } = credentials

    try {
      setIsLoading(true)

      if (newPassword !== confirmNewPassword) {
        throw new Error('auth/different-passwords')
      }

      const response = await changePassword({ email, oldPassword, newPassword })

      if (response.status === SERVER_RESPONSE_STATUS.OK) {
        setSuccess(true)
        await logout()
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
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'>
            <Balancer>We have a problem!</Balancer>
          </Headline>
          <p className='mb-5 text-sm font-secondaryFont'>
            <Balancer>
              {ERROR_MESSAGES[error] ?? commonErrorMessage(error)}
            </Balancer>
          </p>
          {error !== 'auth/expired-session' && (
            <Button
              ariaLabel='Go back'
              onClick={handleClick}
              variant='secondary'
            >
              <ArrowLeftIcon className='w-4 stroke-3' />
            </Button>
          )}
          {error === 'auth/expired-session' && (
            <a
              aria-label='Login'
              className='block relative w-full h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:block before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute rounded-full before:transition before:duration-400 before:ease-in-out md:hover:before:translate-y-0 text-blue dark:text-blue bg-black md:dark:hover:text-black md:hover:text-black before:bg-white'
              href='/login'
            >
              <div className='relative flex items-center justify-center gap-2 px-5 md:text-base'>
                <ArrowRightIcon className='w-4 stroke-3' />
              </div>
            </a>
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
          <a
            aria-label='Login'
            className='block relative w-full h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:block before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute rounded-full before:transition before:duration-400 before:ease-in-out md:hover:before:translate-y-0 text-blue dark:text-blue bg-black md:dark:hover:text-black md:hover:text-black before:bg-white'
            href='/login'
          >
            <div className='relative flex items-center justify-center gap-2 px-5 md:text-base'>
              <ArrowRightIcon className='w-4 stroke-3' />
            </div>
          </a>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-96 min-w-auto rounded-3xl'>
          <Headline variant='md'>
            <Balancer>
              {step === FIRST_STEP ? 'Change password' : 'Enter new password'}
            </Balancer>
          </Headline>
          <Paragraph variant='sm'>
            <Balancer>
              If you wish to change your password,{' '}
              <b>please complete the following form.</b>
            </Balancer>
          </Paragraph>
          {step === FIRST_STEP && (
            <form
              className='mt-5'
              onSubmit={(event) => {
                void handleStepOne(event)
              }}
            >
              <div className='flex flex-col gap-3 mb-3'>
                <Input
                  onChange={handleChange}
                  value={credentials.currentPassword}
                  name='currentPassword'
                  type='password'
                  placeholder='Current Password'
                  minLength={8}
                  autoComplete='current-password'
                  centerText
                  required
                />
              </div>
              <Button
                ariaLabel='Next'
                variant='secondary'
                isLoading={isLoading}
              >
                <ArrowRightIcon className='w-4 stroke-3' />
              </Button>
            </form>
          )}
          {step === SECOND_STEP && (
            <form
              className='mt-5'
              onSubmit={(event) => {
                void handleStepTwo(event)
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
                    autoComplete='new-password'
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
                    autoComplete='new-password'
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
          )}
        </div>
      </div>
    </PageTransition>
  )
}
