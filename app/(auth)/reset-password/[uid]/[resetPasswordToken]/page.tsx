'use client'

import { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'
import resetPassword from 'services/auth/resetPassword'
import { useRouter } from 'next/navigation'

interface ParamsInterface {
  params: {
    uid: string
    resetPasswordToken: string
  }
}

const INITIAL_CREDENTIALS_STATE = {
  newPassword: '',
  confirmNewPassword: ''
}

export default function ResetPassword ({ params }: ParamsInterface): JSX.Element {
  const router = useRouter()
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handlePasswordValidation = (): void => {
    if (credentials.newPassword !== credentials.confirmNewPassword) {
      console.log('Passwords do not match')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { newPassword } = credentials
    const { uid, resetPasswordToken } = params
    try {
      await resetPassword({ newPassword, uid, resetPasswordToken })
      router.push('/login')
    } catch (error: any) {
      console.error(error.response)
    }
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center bg-white text-dark-gray md:w-96 min-w-auto'>
        <Headline variant='md'><b>Reset password</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col gap-3 mb-5'>
            <Input variant='primary' onChange={handleChange} value={credentials.newPassword} onKeyUp={handlePasswordValidation} name='newPassword' type='password' placeholder='New password' autoComplete='new-password' centerText />
            <Input variant='primary' onChange={handleChange} value={credentials.confirmNewPassword} onKeyUp={handlePasswordValidation} name='confirmNewPassword' type='password' placeholder='Confirm new password' autoComplete='new-password' centerText />
          </div>
          <Button variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-width-3' />
          </Button>
        </form>
      </div>
    </div>
  )
}
