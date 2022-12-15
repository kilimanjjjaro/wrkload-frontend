'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'
import GitHubLogo from '../../../public/images/github.svg'
import GoogleLogo from '../../../public/images/google.svg'
import TextLink from 'app/components/shared/TextLink'
import { UserContext } from 'context/UserContext'
import register from 'services/auth/register'
import getCurrentUser from 'services/users/getCurrentUser'

export default function Register (): JSX.Element {
  const router = useRouter()

  const { setUser } = useContext(UserContext)
  const [username, setUsername] = useState('kilimanjjjaro')
  const [email, setEmail] = useState('hola@kilimanjjjaro.com')
  const [password, setPassword] = useState('A123456b')
  const [confirmPassword, setConfirmPassword] = useState('A123456b')

  const handleRegistry = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const newUser = {
      username,
      email,
      password
    }

    try {
      await register(newUser)
      const currentUser = await getCurrentUser()
      localStorage.setItem('user', JSON.stringify(currentUser))
      setUser(currentUser)
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      router.push('/tasks')
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  const handleValidation = (): void => {
    if (password !== confirmPassword) {
      console.error('Passwords do not match')
    }
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Nice to meet you!</b></Headline>
        <form onSubmit={(event) => { void handleRegistry(event) }}>
          <div className='flex flex-col gap-3 mb-5'>
            <Input onChange={(event) => setUsername(event.target.value)} value={username} type='text' placeholder='Username' autoComplete='email' centerText />
            <Input onChange={(event) => setEmail(event.target.value)} value={email} type='email' placeholder='Email' autoComplete='email' centerText />
            <Input onChange={(event) => setPassword(event.target.value)} onKeyUp={handleValidation} value={password} type='password' placeholder='Password' autoComplete='current-password' centerText />
            <Input onChange={(event) => setConfirmPassword(event.target.value)} onKeyUp={handleValidation} value={confirmPassword} type='password' placeholder='Confirm Password' autoComplete='current-password' centerText />
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
          <Button variant='alternative' fullwidth>
            <GoogleLogo className='w-4' />
            Google
          </Button>
          <Button variant='alternative' fullwidth>
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
