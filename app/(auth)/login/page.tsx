'use client'

import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'
import TextLink from 'app/components/shared/TextLink'
import GitHubLogo from '../../../public/images/github.svg'
import GoogleLogo from '../../../public/images/google.svg'
import useUser from 'hooks/useUser'
import { UsersContext } from 'context/UsersProvider'

export default function Login (): JSX.Element {
  const [email, setEmail] = useState('hola@kilimanjjjaro.com')
  const [password, setPassword] = useState('A123456b')
  const { login } = useUser()
  const { isLogged } = useContext(UsersContext)
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = { email, password }

    if (isLogged) router.push('/tasks')

    try {
      const response = await login(user)
      console.log(response)
      router.push('/tasks')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Welcome again!</b></Headline>
        <form onSubmit={handleLogin}>
          <div className='flex flex-col gap-3 mb-5'>
            <Input onChange={(event) => setEmail(event.target.value)} value={email} type='email' placeholder='Email' autoComplete='email' centerText />
            <Input onChange={(event) => setPassword(event.target.value)} value={password} type='password' placeholder='Password' autoComplete='current-password' centerText />
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
        <TextLink link='/remember-password'>Forgot password?</TextLink>
        <div className=' w-[2px] h-auto bg-white' />
        <TextLink link='/registry'>Not account yet?</TextLink>
      </div>
    </div>
  )
}
