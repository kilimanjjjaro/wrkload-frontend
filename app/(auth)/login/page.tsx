'use client'

import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import GitHubLogo from '../../../public/images/github.svg'
import GoogleLogo from '../../../public/images/google.svg'
import TextLink from 'app/components/shared/TextLink'

export default function Login (): JSX.Element {
  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Welcome again!</b></Headline>
        <form>
          <div className='flex flex-col gap-3 mb-5'>
            <Input type='email' placeholder='Email' autoComplete='email' centerText />
            <Input type='password' placeholder='Password' autoComplete='current-password' centerText />
          </div>
          <Button variant='secondary' onClick={() => { throw new Error('¡Ups!') }}>
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
        <TextLink link='/'>Forgot password?</TextLink>
        <div className=' w-[2px] h-auto bg-white' />
        <TextLink link='/'>Not account yet?</TextLink>
      </div>
    </div>
  )
}
