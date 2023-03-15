import { useContext, useState } from 'react'
import { mutate } from 'swr'
import Balancer from 'react-wrap-balancer'
import { updateUser } from 'services/users/updateUser'
import { updateUserOptions } from 'utils/swrUsersOptions'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import Headline from 'components/shared/Headline'
import Input from 'components/shared/Input'

import { AppContext } from 'contexts/AppContext'
import { ModalsContext } from 'contexts/ModalsContext'

export default function UpdateUser (): JSX.Element {
  const { selectedUser } = useContext(AppContext)
  const { setUpdateDataModalStatus } = useContext(ModalsContext)

  const [user, setUser] = useState(selectedUser)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setUpdateDataModalStatus(false)

    try {
      await mutate('users', updateUser(user), updateUserOptions(user)
      )
      await mutate('loggedUser')
    } catch (error: any) {
      console.error(error.response)
    }
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setUpdateDataModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='w-full p-6 text-center text-black md:p-10 bg-blue md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><Balancer>Update user</Balancer></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-3 gap-y-3'>
            <Input onChange={handleChange} value={user.username} name='username' type='text' placeholder='Username' centerText required />
            <Input onChange={handleChange} value={user.role} name='role' type='number' placeholder='Role' centerText required />
            <Input onChange={handleChange} value={user.email} name='email' type='email' placeholder='Email' autoComplete='email' centerText />
            {/* <Input onChange={handleChange} value={user.avatar} name='avatar' type='file' placeholder='Avatar' centerText required /> */}
          </div>
          <div className='flex justify-center gap-x-3'>
            <Button onClick={(event) => handleCloseModal(event)} variant='dark-alternative'>
              <XMarkIcon className='w-4 stroke-3' />
            </Button>
            <Button type='submit' variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
