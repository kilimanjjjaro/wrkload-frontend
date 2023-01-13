'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'
import TextLink from 'app/components/shared/TextLink'
import GitHubLogo from 'public/images/github.svg'
import GoogleLogo from 'public/images/google.svg'
import login from 'services/auth/login'
import { DataContext } from 'context/DataContext'

const INITIAL_CREDENTIALS_STATE = {
  email: 'hola@kilimanjjjaro.com',
  password: 'SGYvRAV4@wG43Tx'
}

export default function Login (): JSX.Element {
  const router = useRouter()
  const { setIsLogged } = useContext(DataContext)

  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, password } = credentials

    try {
      await login({ email, password })
      setIsLogged(true)
      router.push('/tasks')
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Welcome again!</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col gap-3 mb-5'>
            <Input onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText />
            <Input onChange={handleChange} value={credentials.password} name='password' type='password' placeholder='Password' autoComplete='current-password' centerText />
          </div>
          <Button variant='secondary'>
            <LockClosedIcon className='w-4 stroke-width-3' />
          </Button>
        </form>
        <div className='flex items-center mt-5 text-sm font-semibold font-secondaryFont'>
          <div className='w-[26%] h-[2px] bg-black rounded-full' />
          <span className='w-[48%]'>Maybe you use?</span>
          <div className='w-[26%] h-[2px] bg-black rounded-full' />
        </div>
        <div className='flex gap-5 mt-5'>
          <Button variant='alternative' fullWidth>
            <GoogleLogo className='w-4' />
            Google
          </Button>
          <Button variant='alternative' fullWidth>
            <GitHubLogo className='w-4' />
            Github
          </Button>
        </div>
      </div>
      <div className='flex gap-5 text-sm text-white '>
        <TextLink link='/forgot-password'>Forgot password?</TextLink>
        <div className=' w-[2px] h-auto bg-white' />
        <TextLink link='/registry'>Not account yet?</TextLink>
      </div>
    </div>
  )
}
