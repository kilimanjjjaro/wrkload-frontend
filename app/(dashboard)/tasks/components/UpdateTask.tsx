
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Textarea from 'app/components/shared/Textarea'
import { TaskInterface } from 'interfaces/tasks/Task'
import { useState } from 'react'
import updateTask from 'services/tasks/updateTask'

interface Props {
  taskModalStatus: boolean
  setTaskModalStatus: (value: boolean) => void
  task: TaskInterface
}

export default function UpdateTask ({ taskModalStatus, setTaskModalStatus, task }: Props): JSX.Element {
  const [payload, setPayload] = useState(task)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPayload({ ...payload, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      await updateTask(payload)
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
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto --3xl'>
        <Headline variant='md'><b>Update task</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={payload.title} name='title' type='text' placeholder='Title' centerText required />
            <Input variant='primary' onChange={handleChange} value={payload.project} name='project' type='text' placeholder='Project' centerText required />
            <Input variant='primary' onChange={handleChange} value={payload.timing} name='timing' type='time' placeholder='Timing' centerText required />
            <Input variant='primary' onChange={handleChange} value={payload.deliveredAt} name='deliveredAt' type='date' placeholder='Delivered' centerText required />
            <Textarea onChange={handleChange} value={payload.description} name='description' placeholder='Description' centerText />
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
