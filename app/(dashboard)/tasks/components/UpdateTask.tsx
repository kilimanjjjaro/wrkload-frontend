import { useState } from 'react'
import { mutate } from 'swr'
import { updateTask, tasksEndpoint as key } from 'services/tasks/tasks'
import { updateTaskOptions } from 'utils/swrTasksOptions'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Textarea from 'app/components/shared/Textarea'

import type { TaskInterface } from 'interfaces/tasks/Task'

interface Props {
  data: TaskInterface
  setModalStatus: (value: boolean) => void
}

export default function UpdateTask ({ data, setModalStatus }: Props): JSX.Element {
  const [task, setTask] = useState(data)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setTask({ ...task, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setModalStatus(false)

    try {
      await mutate(
        key,
        updateTask(task),
        updateTaskOptions(task)
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseModal = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center bg-white text-dark-gray md:w-96 min-w-auto'>
        <Headline variant='md'><b>Update task</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={task.title} name='title' type='text' placeholder='Title' required />
            <Input variant='primary' onChange={handleChange} value={task.project} name='project' type='text' placeholder='Project' required />
            <Input variant='primary' onChange={handleChange} value={task.timing} name='timing' type='time' placeholder='Timing' required />
            <Input variant='primary' onChange={handleChange} value={task.deliveredAt} name='deliveredAt' type='date' placeholder='Delivered' required />
            <Textarea variant='primary' onChange={handleChange} value={task.description} name='description' placeholder='Description' />
          </div>
          <div className='flex justify-center gap-x-3'>
            <Button type='submit' variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-width-3' />
            </Button>
            <Button onClick={(event) => handleCloseModal(event)} variant='alternative'>
              <XMarkIcon className='w-4 stroke-width-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
