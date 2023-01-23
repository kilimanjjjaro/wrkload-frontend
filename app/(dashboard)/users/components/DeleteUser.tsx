import { useState } from 'react'
import { mutate } from 'swr'
import { deleteUser } from 'services/users/deleteUser'
import { deleteUserOptions } from 'utils/swrUsersOptions'
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

export default function DeleteUser ({ data, setModalStatus }: Props): JSX.Element {
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
        deleteUser(user._id),
        deleteUserOptions(user._id)
      )
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
        <Headline variant='md'><b>Sure to delete this user?</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={user.username} name='username' type='text' placeholder='Username' centerText required disabled />
            <Input variant='primary' onChange={handleChange} value={user.email} name='email' type='email' placeholder='Email' centerText required disabled />
          </div>
          <div className='flex justify-center gap-x-3'>
            <Button type='submit' variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-3' />
            </Button>
            <Button onClick={handleCloseModal} variant='alternative'>
              <XMarkIcon className='w-4 stroke-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
