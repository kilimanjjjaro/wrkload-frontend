'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'
import GitHubLogo from 'public/images/github.svg'
import GoogleLogo from 'public/images/google.svg'
import TextLink from 'app/components/shared/TextLink'
import register from 'services/auth/register'
import { DataContext } from 'context/DataContext'

const INITIAL_CREDENTIALS_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function Register (): JSX.Element {
  const router = useRouter()
  const { setIsLogged } = useContext(DataContext)

  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handlePasswordValidation = (): void => {
    if (credentials.password !== credentials.confirmPassword) {
      console.log('Passwords do not match')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { username, email, password } = credentials

    try {
      await register({ username, email, password })
      setIsLogged(true)
      router.push('/tasks')
    } catch (error: any) {
      console.error(error.response)
    }
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center bg-white text-dark-gray md:w-96 min-w-auto'>
        <Headline variant='md'><b>Nice to meet you!</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col gap-3 mb-5'>
            <Input variant='primary' onChange={handleChange} value={credentials.username} name='username' type='text' placeholder='Username' centerText />
            <Input variant='primary' onChange={handleChange} value={credentials.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText />
            <Input variant='primary' onChange={handleChange} onKeyUp={handlePasswordValidation} name='password' value={credentials.password} type='password' placeholder='Password' autoComplete='current-password' centerText />
            <Input variant='primary' onChange={handleChange} onKeyUp={handlePasswordValidation} name='confirmPassword' value={credentials.confirmPassword} type='password' placeholder='Confirm Password' autoComplete='current-password' centerText />
          </div>
          <Button variant='secondary'>
            <LockClosedIcon className='w-4 stroke-3' />
          </Button>
        </form>
        <div className='flex items-center mt-5 text-sm font-semibold font-secondaryFont'>
          <div className='w-[26%] h-[2px] bg-light-gray dark:bg-black' aria-hidden='true' />
          <span className='w-[48%]'>Maybe you use?</span>
          <div className='w-[26%] h-[2px] bg-light-gray dark:bg-black' aria-hidden='true' />
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
        <TextLink link='/login'>Already have an account?</TextLink>
      </div>
    </div>
  )
}
