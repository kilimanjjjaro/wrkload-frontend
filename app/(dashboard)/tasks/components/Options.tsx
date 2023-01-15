import { useState } from 'react'
import { CalendarIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Modal from 'app/components/shared/Modal'
import AddTask from 'app/(dashboard)/tasks/components/AddTask'

export const Options = (): JSX.Element => {
  const [addTaskModalStatus, setAddTaskModalStatus] = useState(false)

  return (
    <>
      <div className='hidden lg:flex gap-x-5'>
        <Button onClick={() => setAddTaskModalStatus(!(addTaskModalStatus))} variant='primary'><PlusIcon className='w-4 stroke-width-3' /></Button>
        <Button variant='primary'><CalendarIcon className='w-4 stroke-width-3' /></Button>
        <Button variant='primary'><MagnifyingGlassIcon className='w-4 stroke-width-3' /></Button>
      </div>
      <Modal dependency={addTaskModalStatus} close={() => setAddTaskModalStatus(!(addTaskModalStatus))}>
        <AddTask modalStatus={addTaskModalStatus} setModalStatus={setAddTaskModalStatus} />
      </Modal>
    </>
  )
}
