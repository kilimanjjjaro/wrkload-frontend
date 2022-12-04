'use client'

import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import Textarea from 'app/components/shared/Textarea'
import { DataContext } from 'context/DataContext'
import { useContext } from 'react'

const AddTask = (): JSX.Element => {
  const { showTaskModal, setShowTaskModal } = useContext(DataContext)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setShowTaskModal(!(showTaskModal === true))
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-96 min-w-auto rounded-3xl'>
        <Headline variant='md'><b>Create task</b></Headline>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input type='text' placeholder='Title' centerText required />
            <Input type='text' placeholder='Project' centerText required />
            <Input type='time' placeholder='Timing' centerText required />
            <Input type='date' placeholder='Delivered' centerText required />
            <Textarea placeholder='Description' centerText />
          </div>
          <div className='flex justify-center gap-x-3'>
            <Button type='submit' variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-width-3' />
            </Button>
            <Button onClick={() => setShowTaskModal(!(showTaskModal === true))} variant='alternative'>
              <XMarkIcon className='w-4 stroke-width-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTask
