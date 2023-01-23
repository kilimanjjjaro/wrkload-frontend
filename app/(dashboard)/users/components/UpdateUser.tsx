import { useState } from 'react'
import { mutate } from 'swr'
import { updateUser } from 'services/users/updateUser'
import { updateUserOptions } from 'utils/swrUsersOptions'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'

import type { UserInterface } from 'interfaces/users/User'
import { USERS_ENDPOINT as key } from 'constants/users'

interface Props {
  data: UserInterface
  setModalStatus: (value: boolean) => void
}

export default function UpdateUser ({ data, setModalStatus }: Props): JSX.Element {
  const [user, setUser] = useState(data)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setModalStatus(false)

    try {
      await mutate(
        key,
        updateUser(user),
        updateUserOptions(user)
      )
      await mutate(`${key}/_id`)
    } catch (error: any) {
      console.error(error.response)
    }
  }

  const handleCloseModal = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center bg-white text-dark-gray md:w-96 min-w-auto'>
        <Headline variant='md'><b>Update user</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={user.username} name='username' type='text' placeholder='Username' centerText required />
            <Input variant='primary' onChange={handleChange} value={user.role} name='role' type='number' placeholder='Role' centerText required />
            <Input variant='primary' onChange={handleChange} value={user.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText />
            {/* <Input variant='primary' onChange={handleChange} value={user.avatar} name='avatar' type='file' placeholder='Avatar' centerText required /> */}
          </div>
          <div className='flex justify-center gap-x-3'>
            <Button type='submit' variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-width-3' />
            </Button>
            <Button onClick={handleCloseModal} variant='alternative'>
              <XMarkIcon className='w-4 stroke-width-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
