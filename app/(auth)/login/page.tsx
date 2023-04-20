'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { setCookie } from 'cookies-next'
import { toast } from 'sonner'
import { ArrowLeftIcon, HeartIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Input from 'components/shared/Input'
import Button from 'components/shared/Button'
import TextLink from 'components/shared/TextLink'
import GitHubLogo from 'public/images/github.svg'
import GoogleLogo from 'public/images/google.svg'
import login from 'services/auth/login'
import { AppContext } from 'contexts/AppContext'
import PageTransition from 'components/shared/PageTransition'

const INITIAL_CREDENTIALS_STATE = {
  email: '',
  password: ''
}

export default function Login (): JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUser, setIsLoggingIn, trialMode } = useContext(AppContext)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, password } = credentials

    try {
      setIsLoading(true)
      setIsLoggingIn(true)
      const response = await login({ email, password })

      if (response.status === 'ok') {
        setUser(response.user)
        setCookie('isLogged', true, {
          maxAge: 60 * 60 * 24 * 30,
          secure: true,
          sameSite: 'strict'
        })
        router.push('/tasks')
        if (response.user._id === '6439b01cf35b6e22570cd842') {
          toast(
            <>
              <HeartIcon className='w-4 stroke-blue stroke-3' />
              <h3 className='font-bold'>Welcome to the trial mode</h3>
              <p><Balancer>This is a trial account, you must register to access all the features.</Balancer></p>
            </>
          )
        }
      }
    } catch (error: any) {
      setError(error.response.data.code)
    } finally {
      setIsLoading(false)
      setIsLoggingIn(false)
    }
  }

  useEffect(() => {
    if (trialMode) {
      setCredentials({
        email: 'wrkload@kilimanjjjaro.com',
        password: 'Ec@z92!QWKFkmhY'
      })
    }
  }, [trialMode])

  if (error.length >= 1) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>We have a problem!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'>
            <Balancer>
              {error === 'auth/user-not-found' && 'No account associated with this email was found, please try again.'}
              {error === 'auth/invalid-credentials' && 'The email or password are invalid. Please, try again.'}
              {error === 'auth/account-not-confirmed' && (
                <>
                  This account has not been confirmed yet. <b>Please, do this first.</b>
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
    <PageTransition>
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-96 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>Welcome again!</Balancer></Headline>
          {trialMode && (
            <div className='flex flex-col mb-5 gap-y-3'>
              <Paragraph variant='sm'><Balancer><b>You are about to log in with our trial account</b>, we have filled in the fields for you.</Balancer></Paragraph>
            </div>
          )}
          <form onSubmit={(event) => { void handleSubmit(event) }}>
            <div className='flex flex-col gap-3 mb-3'>
              <Input onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText required />
              <Input onChange={handleChange} value={credentials.password} name='password' type='password' placeholder='Password' autoComplete='current-password' minLength={8} centerText required />
            </div>
            <Button className='group' variant='secondary' isLoading={isLoading}>
              <LockClosedIcon className='w-4 transition-opacity duration-700 ease-in-out opacity-100 stroke-3 group-focus:opacity-0' />
              <LockOpenIcon className='absolute w-4 transition-opacity duration-700 ease-in-out opacity-0 stroke-3 group-focus:opacity-100' />
            </Button>
          </form>
          <div className='flex items-center mt-5 text-sm font-semibold font-secondaryFont'>
            <div className='w-[26%] h-[2px] bg-black dark:bg-black' aria-hidden='true' />
            <span className='w-[48%]'>Maybe you use?</span>
            <div className='w-[26%] h-[2px] bg-black dark:bg-black' aria-hidden='true' />
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
        <div className='flex gap-5 text-sm'>
          <TextLink link='/remember-password'>Forgot password?</TextLink>
          <div className='w-[2px] h-auto bg-black dark:bg-white transition-colors duration-400 ease-in-out' aria-hidden='true' />
          <TextLink link='/registry'>Not account yet?</TextLink>
        </div>
      </div>
    </PageTransition>
  )
}
