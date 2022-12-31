
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Textarea from 'app/components/shared/Textarea'
import { useState } from 'react'
import createTask from 'services/tasks/createTask'

interface Props {
  taskModalStatus: boolean
  setTaskModalStatus: (value: boolean) => void
}

const INITIAL_TASK_STATE = {
  title: 'Warzone',
  project: 'Powgen',
  timing: '20:40',
  month: 'Agosto',
  deliveredAt: '2022-10-20',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget scelerisque orci. Aenean dictum magna sed porttitor congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
}

const AddTask = ({ taskModalStatus, setTaskModalStatus }: Props): JSX.Element => {
  const [task, setTask] = useState(INITIAL_TASK_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask({ ...task, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      await createTask(task)
      setTaskModalStatus(!(taskModalStatus))
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  const handleUpdateTask = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      await updateTask(task)
      setTaskModalStatus(!(taskModalStatus))
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  const handleCloseModal = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setTaskModalStatus(!(taskModalStatus))
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Create task</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input onChange={handleChange} value={task.title} name='title' type='text' placeholder='Title' centerText required />
            <Input onChange={handleChange} value={task.project} name='project' type='text' placeholder='Project' centerText required />
            <Input onChange={handleChange} value={task.timing} name='timing' type='time' placeholder='Timing' centerText required />
            <Input onChange={handleChange} value={task.deliveredAt} name='deliveredAt' type='date' placeholder='Delivered' centerText required />
            <Textarea onChange={handleChange} value={task.description} name='description' placeholder='Description' centerText />
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

export default AddTask
