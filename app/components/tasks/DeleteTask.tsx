import { useContext, useState } from 'react'
import { mutate } from 'swr'
import { deleteTask } from 'services/tasks/deleteTask'
import { deleteTaskOptions } from 'utils/swrTasksOptions'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'

import { DataContext } from 'context/DataContext'
import { TASKS_ENDPOINT as key } from 'constants/tasks'

export default function DeleteTask (): JSX.Element {
  const { setDeleteTaskModalStatus, selectedTask } = useContext(DataContext)

  const [task, setTask] = useState(selectedTask)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask({ ...task, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setDeleteTaskModalStatus(false)

    try {
      await mutate(
        key,
        deleteTask(task._id),
        deleteTaskOptions(task._id)
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setDeleteTaskModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center bg-white text-dark-gray md:w-96 min-w-auto'>
        <Headline variant='md'><b>Sure to delete this task?</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={task.title} name='title' type='text' placeholder='Title' centerText required disabled />
          </div>
          <div className='flex justify-center gap-x-3'>
            <Button type='submit' variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-3' />
            </Button>
            <Button onClick={(event) => handleCloseModal(event)} variant='alternative'>
              <XMarkIcon className='w-4 stroke-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
