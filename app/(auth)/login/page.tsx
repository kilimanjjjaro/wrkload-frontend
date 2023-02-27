'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import TextLink from 'components/shared/TextLink'
import GitHubLogo from 'public/images/github.svg'
import GoogleLogo from 'public/images/google.svg'
import login from 'services/auth/login'
import { DataContext } from 'contexts/DataContext'

const INITIAL_CREDENTIALS_STATE = {
  email: 'hola@kilimanjjjaro.com',
  password: 'SGYvRAV4@wG43Tx'
}

export const metadata = {
  title: 'Login'
}

export default function Login (): JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)
  const [error, setError] = useState('')
  const { setIsLogged } = useContext(DataContext)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, password } = credentials

    try {
      const response = await login({ email, password })

      if (response.status === 'ok') {
        setIsLogged(true)
        router.push('/tasks')
      }
    } catch (error: any) {
      setError(error.response.data.code)
    }
  }

  if (error.length >= 1) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10ull bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>We have a problem!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'>
            <Balancer>
              {error === 'auth/user-not-found' && 'No account associated with this email was found, please try again.'}
              {error === 'auth/invalid-credentials' && 'The email or password are invalid. Please, try again.'}
              {error === 'auth/account-not-confirmed' && (
                <>
                  This account has not been confirmed yet. <br /><b>Please, do this first.</b>
                </>
              )}
            </Balancer>
          </p>
          <Button onClick={() => window.location.reload()} variant='secondary'>
            <ArrowLeftIcon className='w-4 stroke-3' />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-6 text-center text-black md:p-10 bg-blue md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><Balancer>Welcome again!</Balancer></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col gap-3 mb-5'>
            <Input variant='primary' onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText />
            <Input variant='primary' onChange={handleChange} value={credentials.password} name='password' type='password' placeholder='Password' autoComplete='current-password' centerText />
          </div>
          <Button variant='secondary'>
            <LockClosedIcon className='w-4 stroke-3' />
          </Button>
        </form>
        <div className='flex items-center mt-5 text-sm font-semibold font-secondaryFont'>
          <div className='w-[26%] h-[2px] bg-black dark:bg-black' aria-hidden='true' />
          <span className='w-[48%]'>Maybe you use?</span>
          <div className='w-[26%] h-[2px] bg-black dark:bg-black' aria-hidden='true' />
        </div>
        <div className='flex gap-5 mt-5'>
          <Button variant='dark-alternative' fullWidth>
            <GoogleLogo className='w-4' />
            Google
          </Button>
          <Button variant='dark-alternative' fullWidth>
            <GitHubLogo className='w-4' />
            Github
          </Button>
        </div>
      </div>
      <div className='flex gap-5 text-sm'>
        <TextLink link='/remember-password'>Forgot password?</TextLink>
        <div className='w-[2px] h-auto bg-black dark:bg-white transition-colors duration-400 ease-in-out' aria-hidden='true' />
        <TextLink link='/registry'>Not account yet?</TextLink>
      </div>
    </div>
  )
}
