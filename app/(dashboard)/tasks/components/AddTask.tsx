
import { useState } from 'react'
import { mutate } from 'swr'
import { addTask, tasksEndpoint as key } from 'services/tasks/tasks'
import { addTaskOptions } from 'utils/swrOptions'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Textarea from 'app/components/shared/Textarea'
import { INITIAL_TASK_STATE } from 'constants/tasks'

interface Props {
  setModalStatus: (value: boolean) => void
}

const AddTask = ({ setModalStatus }: Props): JSX.Element => {
  const [task, setTask] = useState(INITIAL_TASK_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask({ ...task, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setModalStatus(false)

    try {
      await mutate(
        key,
        addTask(task),
        addTaskOptions(task)
      )
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  const handleCloseModal = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center bg-white text-dark-gray md:w-96 min-w-auto'>
        <Headline variant='md'><b>Add task</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={task.title} name='title' type='text' placeholder='Title' centerText required />
            <Input variant='primary' onChange={handleChange} value={task.project} name='project' type='text' placeholder='Project' centerText required />
            <Input variant='primary' onChange={handleChange} value={task.timing} name='timing' type='time' placeholder='Timing' centerText required />
            <Input variant='primary' onChange={handleChange} value={task.deliveredAt} name='deliveredAt' type='date' placeholder='Delivered' centerText required />
            <Textarea variant='primary' onChange={handleChange} value={task.description} name='description' placeholder='Description' centerText />
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
