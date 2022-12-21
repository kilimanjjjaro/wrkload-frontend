'use client'

import { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Button from 'app/components/shared/Button'
import login from 'services/auth/login'
import changePassword from 'services/auth/changePassword'

const INITIAL_CREDENTIALS_STATE = {
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
}

export default function ChangePassword (): JSX.Element {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS_STATE)
  const [step, setStep] = useState(1)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handlePasswordValidation = (): void => {
    if (credentials.newPassword !== credentials.confirmNewPassword) {
      console.log('Passwords do not match')
    }
  }

  const handleStepOne = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, currentPassword: password } = credentials

    try {
      await login({ email, password })
      setStep(2)
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  const handleStepTwo = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { email, currentPassword: oldPassword, newPassword } = credentials

    try {
      await changePassword({ email, oldPassword, newPassword })
      setStep(1)
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>{step === 1 ? 'Change password' : 'Enter new password'}</b></Headline>
        {step === 1 && (
          <form onSubmit={(event) => { void handleStepOne(event) }}>
            <div className='flex flex-col gap-3 mb-5'>
              <Input onChange={handleChange} value={credentials.currentPassword} name='currentPassword' type='password' placeholder='Current Password' autoComplete='current-password' centerText />
            </div>
            <Button variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-width-3' />
            </Button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={(event) => { void handleStepTwo(event) }}>
            <div className='flex flex-col gap-3 mb-5'>
              <Input onChange={handleChange} value={credentials.newPassword} onKeyUp={handlePasswordValidation} name='newPassword' type='password' placeholder='New password' autoComplete='new-password' centerText />
              <Input onChange={handleChange} value={credentials.confirmNewPassword} onKeyUp={handlePasswordValidation} name='confirmNewPassword' type='password' placeholder='Confirm new password' autoComplete='new-password' centerText />
            </div>
            <Button variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-width-3' />
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
