'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import clsx from 'clsx'
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

const INITIAL_CREDENTIALS_STATE = {
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
}

export default function ChangePassword (): JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(1)
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

  useEffect(() => {
    if (accessToken !== undefined) {
      const { email }: { email: string } = jwtDecode(accessToken as string)
      setEmail(email)
    }
  }, [accessToken])

  const handleStepOne = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { currentPassword: password } = credentials

    try {
      setIsLoading(true)

      await login({ email, password })
      // TODO: handle week password
      // TODO: handle unlogged session
      setStep(2)
    } catch (error: any) {
      if (error.response.data.error[0].param === 'email') {
        setError('auth/expired-session')
      }
      if (error.response.data.code === 'auth/invalid-credentials') {
        setError('auth/invalid-credentials')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleStepTwo = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { currentPassword: oldPassword, newPassword, confirmNewPassword } = credentials

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
    } catch (error: any) {
      if (error.message === 'auth/different-passwords') {
        setError('auth/different-passwords')
        return
      }

      if (error.response.data.code === 'auth/invalid-credentials') {
        setError('auth/invalid-credentials')
      }

      if (error.response.data.code === 'trial/permission-denied') {
        setError('trial/permission-denied')
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
          <p className='mb-5 text-sm font-secondaryFont'>
            <Balancer>
              {error === 'trial/permission-denied' && 'This is a trial account, to access this feature you must register.'}
              {error === 'auth/different-passwords' && 'Passwords are not the same. Please, try again.'}
              {error === 'auth/invalid-credentials' && 'The email or password are invalid. Please, try again.'}
              {error === 'auth/expired-session' && 'Your session has expired. Please, log in again to change your password.'}
            </Balancer>
          </p>
          {error !== 'auth/expired-session' && (
            <Button ariaLabel='Go back' onClick={handleClick} variant='secondary'>
              <ArrowLeftIcon className='w-4 stroke-3' />
            </Button>
          )}
          {error === 'auth/expired-session' && (
            <a aria-label='Login' className='block relative w-full h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:block before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute rounded-full before:transition before:duration-400 before:ease-in-out md:hover:before:translate-y-0 text-blue dark:text-blue bg-black md:dark:hover:text-black md:hover:text-black before:bg-white' href='/login'>
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
          <Headline variant='md'><Balancer>Done!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'><Balancer>You can now use your new password. <b>Please, log in again.</b></Balancer></p>
          <a aria-label='Login' className='block relative w-full h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:block before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute rounded-full before:transition before:duration-400 before:ease-in-out md:hover:before:translate-y-0 text-blue dark:text-blue bg-black md:dark:hover:text-black md:hover:text-black before:bg-white' href='/login'>
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
          <Headline variant='md'><Balancer>{step === 1 ? 'Change password' : 'Enter new password'}</Balancer></Headline>
          <Paragraph variant='sm'>
            <Balancer>
              If you wish to change your password, <b>please complete the following form.</b>
            </Balancer>
          </Paragraph>
          {step === 1 && (
            <form className='mt-5' onSubmit={(event) => { void handleStepOne(event) }}>
              <div className='flex flex-col gap-3 mb-3'>
                <Input onChange={handleChange} value={credentials.currentPassword} name='currentPassword' type='password' placeholder='Current Password' minLength={8} autoComplete='current-password' centerText required />
              </div>
              <Button ariaLabel='Next' variant='secondary' isLoading={isLoading}>
                <ArrowRightIcon className='w-4 stroke-3' />
              </Button>
            </form>
          )}
          {step === 2 && (
            <form className='mt-5' onSubmit={(event) => { void handleStepTwo(event) }}>
              <div className='flex flex-col gap-3 mb-3'>
                <div className='relative flex items-center'>
                  <Input onChange={handleChange} value={credentials.newPassword} name='newPassword' type='password' placeholder='New password' autoComplete='new-password' minLength={8} centerText required />
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
                  <Input onChange={handleChange} value={credentials.confirmNewPassword} name='confirmNewPassword' type='password' placeholder='Confirm new password' autoComplete='new-password' centerText required />
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
              <Button ariaLabel='Submit' variant='secondary' isLoading={isLoading}>
                <ArrowRightIcon className='w-4 stroke-3' />
              </Button>
            </form>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
