
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import { useState } from 'react'
import addUser from 'services/users/addUser'

interface Props {
  modalStatus: boolean
  setModalStatus: (value: boolean) => void
}

const INITIAL_PROJECT_STATE = {
  username: '',
  role: 0,
  email: '',
  avatar: ''
}

const AddUser = ({ modalStatus, setModalStatus }: Props): JSX.Element => {
  const [user, setUser] = useState(INITIAL_PROJECT_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      await addUser(user)
      setModalStatus(!(modalStatus))
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  const handleCloseModal = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setModalStatus(!(modalStatus))
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center bg-white text-dark-gray md:w-96 min-w-auto'>
        <Headline variant='md'><b>Add user</b></Headline>
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

export default AddUser
