'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon, ArrowRightIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import TextLink from 'components/shared/TextLink'
import GitHubLogo from 'public/images/github.svg'
import GoogleLogo from 'public/images/google.svg'
import register from 'services/auth/register'
import PageTransition from 'components/shared/PageTransition'
import clsx from 'clsx'

const INITIAL_CREDENTIALS_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function Register (): JSX.Element {
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
    router.refresh()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { username, email, password, confirmPassword } = credentials

    try {
      setIsLoading(true)

      if (password !== confirmPassword) {
        throw new Error('auth/different-passwords')
      }

      const response = await register({ username, email, password })
      // TODO: handle week password

      if (response.status === 'ok') {
        setSuccess(true)
      }
    } catch (error: any) {
      if (error.message === 'auth/different-passwords') {
        setError('auth/different-passwords')
        return
      }

      if (error.response.data.code === 'auth/email-already-exists') {
        setError('auth/email-already-exists')
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
              {error === 'auth/different-passwords' && 'Passwords are not the same. Please, try again.'}
              {error === 'auth/email-already-exists' && 'An account with this email already exists. Please, try another one or login.'}
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
          <p className='mb-5 text-sm font-secondaryFont'><Balancer>The account has been created and an email will be sent to activate it.</Balancer></p>
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
          <Headline variant='md'><Balancer>Nice to meet you!</Balancer></Headline>
          <form onSubmit={(event) => { void handleSubmit(event) }}>
            <div className='flex flex-col gap-3 mb-3'>
              <Input onChange={handleChange} value={credentials.username} name='username' type='text' placeholder='Username' centerText required />
              <Input onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText required />
              <div className='relative flex items-center'>
                <Input onChange={handleChange} value={credentials.password} name='password' type='password' placeholder='Password' autoComplete='current-password' minLength={8} centerText required />
                <div className={clsx(
                  'absolute flex items-center gap-x-1 right-3 [&>svg]:w-[12px] [&>svg]:h-[12px] [&>svg]:stroke-transparent',
                  credentials.password.length > 0 && credentials.password.length < 8 && '[&>svg]:!stroke-red',
                  credentials.password.length >= 7 && credentials.password.length < 12 && '[&>svg]:!stroke-yellow',
                  credentials.password.length >= 11 && '[&>svg]:!stroke-green'
                )}
                >
                  {credentials.password.length > 0 && (
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' strokeWidth='3' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                    </svg>
                  )}
                  {credentials.password.length >= 7 && (
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' strokeWidth='3' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                    </svg>
                  )}
                  {credentials.password.length >= 11 && (
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' strokeWidth='3' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                    </svg>
                  )}
                </div>
              </div>
              <Input onChange={handleChange} value={credentials.confirmPassword} name='confirmPassword' type='password' placeholder='Confirm Password' autoComplete='current-password' minLength={8} centerText required />
            </div>
            <Button className='group' variant='secondary' isLoading={isLoading}>
              <LockClosedIcon className='w-4 transition-opacity duration-700 ease-in-out opacity-100 stroke-3 group-focus:opacity-0' />
              <LockOpenIcon className='absolute w-4 transition-opacity duration-700 ease-in-out opacity-0 stroke-3 group-focus:opacity-100' />
            </Button>
          </form>
          <div className='flex items-center mt-5 text-sm font-semibold font-secondaryFont'>
            <div className='w-[26%] h-[2px] bg-black' aria-hidden='true' />
            <span className='w-[48%]'>Maybe you use?</span>
            <div className='w-[26%] h-[2px] bg-black' aria-hidden='true' />
          </div>
          <div className='flex gap-5 mt-5'>
            <div className='relative flex justify-center w-full group'>
              <Button variant='dark-alternative' fullWidth>
                <GoogleLogo className='w-4' />
                Google
              </Button>
              <div className='absolute invisible opacity-100 md:opacity-0 tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out top-8 bg-light-blue duration-400 group-hover:opacity-100 group-hover:visible rounded-full'>
                Coming soon
              </div>
            </div>
            <div className='relative flex justify-center w-full group'>
              <Button variant='dark-alternative' fullWidth>
                <GitHubLogo className='w-4' />
                Github
              </Button>
              <div className='absolute invisible opacity-100 md:opacity-0 tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out top-8 bg-light-blue duration-400 group-hover:opacity-100 group-hover:visible rounded-full'>
                Coming soon
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-5 text-sm text-white '>
          <TextLink link='/login'>Already have an account?</TextLink>
        </div>
      </div>
    </PageTransition>
  )
}
