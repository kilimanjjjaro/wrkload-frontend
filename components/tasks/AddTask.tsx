'use client'

import { useContext, useState } from 'react'
import { mutate } from 'swr'
import Balancer from 'react-wrap-balancer'
import { toast } from 'sonner'
import { addTask } from 'services/tasks/addTask'
import { addTaskOptions } from 'utils/swrTasksOptions'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Input from 'components/shared/Input'
import Textarea from 'components/shared/Textarea'
import { ModalsContext } from 'contexts/ModalsContext'
import { AppContext } from 'contexts/AppContext'
import { INITIAL_TASK_STATE } from 'constants/tasks'
import { CHARACTER_LIMIT } from 'constants/components'

export default function AddTask (): JSX.Element {
  const { setAddDataModalStatus } = useContext(ModalsContext)
  const { selectedProjectToFetch } = useContext(AppContext)

  const [task, setTask] = useState(INITIAL_TASK_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setTask({ ...task, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setAddDataModalStatus(false)

    try {
      task.project = selectedProjectToFetch

      const response = await mutate('tasks', addTask(task), addTaskOptions(task))

      if (response?.status === 'ok') {
        toast.success('Task added successfully!')
      } else {
        toast.error('Something went wrong. Please, try again!')
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setAddDataModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='w-full p-6 text-center text-black md:p-10 bg-blue md:w-96 min-w-auto rounded-t-3xl md:rounded-3xl'>
        <Headline variant='md'><Balancer>Add task</Balancer></Headline>
        <Paragraph variant='xs'>
          <Balancer>
            If you want to add a new task to another project, go to that project or create it.
          </Balancer>
        </Paragraph>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-3 gap-y-3'>
            <Input onChange={handleChange} value={task.title} name='title' type='text' placeholder='Title' required />
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
