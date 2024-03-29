import { useContext, useState } from 'react'
import { mutate } from 'swr'
import Balancer from 'react-wrap-balancer'
import { updateTask } from 'services/tasks/updateTask'
import { updateTaskOptions } from 'utils/swrTasksOptions'
import { ArrowRightIcon, CheckCircleIcon, ShieldExclamationIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import Headline from 'components/shared/Headline'
import Input from 'components/shared/Input'
import Textarea from 'components/shared/Textarea'
import { AppContext } from 'contexts/AppContext'
import { ModalsContext } from 'contexts/ModalsContext'
import { CHARACTER_LIMIT } from 'constants/components'
import { toast } from 'sonner'

export default function UpdateTask(): JSX.Element {
  const { selectedTask } = useContext(AppContext)
  const { setUpdateDataModalStatus } = useContext(ModalsContext)

  const [task, setTask] = useState(selectedTask)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setTask({ ...task, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setUpdateDataModalStatus(false)

    try {
      const response = await mutate('tasks', updateTask(task), updateTaskOptions(task))

      if (response?.status === 'ok') {
        toast(
          <>
            <CheckCircleIcon className='w-5 stroke-blue stroke-3' />
            <p>Task updated successfully!</p>
          </>
        )
      }
    } catch (error: any) {
      if (error.response.data.code === 'trial/permission-denied') {
        toast(
          <>
            <ShieldExclamationIcon className='w-5 stroke-blue stroke-3' />
            <p>You don&apos;t have permission to update tasks!</p>
          </>
        )
      } else {
        toast(
          <>
            <ShieldExclamationIcon className='w-5 stroke-blue stroke-3' />
            <p>Something went wrong. Please, try again!</p>
          </>
        )
      }
    }
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setUpdateDataModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='w-full p-6 text-center text-black md:p-10 bg-blue md:w-96 min-w-auto rounded-t-3xl md:rounded-3xl'>
        <Headline variant='md'><Balancer>Update task</Balancer></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-3 gap-y-3'>
            <Input onChange={handleChange} value={task.title} name='title' type='text' placeholder='Title' required />
            <Input onChange={handleChange} value={task.project} name='project' type='text' placeholder='Project' required disabled />
            <Input onChange={handleChange} value={task.timing} name='timing' type='time' placeholder='Timing' required />
            <Input onChange={handleChange} value={task.deliveredAt} name='deliveredAt' type='date' placeholder='Delivered' required />
            <div className='relative'>
              <Textarea
                onChange={handleChange} value={task.description} name='description' placeholder='Description'
                maxLength={CHARACTER_LIMIT}
              />
              <div className='absolute text-xs pointer-events-none text-blue bottom-5 right-5 font-secondaryFont'>{task.description.length}/{CHARACTER_LIMIT}
              </div>
            </div>
          </div>
          <div className='flex justify-center gap-x-3'>
            <Button ariaLabel='Close' onClick={(event) => handleCloseModal(event)} variant='dark-alternative'>
              <XMarkIcon className='w-4 stroke-3' />
            </Button>
            <Button ariaLabel='Update' type='submit' variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
