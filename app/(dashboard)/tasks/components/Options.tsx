import { useContext } from 'react'
import { CalendarIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Modal from 'app/components/shared/Modal'
import AddTask from 'app/(dashboard)/tasks/components/AddTask'
import { TasksContext } from 'context/TasksProvider'

export const Options = (): JSX.Element => {
  const { showTaskModal, setShowTaskModal } = useContext(TasksContext)

  return (
    <>
      <div className='hidden lg:flex gap-x-5'>
        <Button onClick={() => setShowTaskModal(!(showTaskModal === true))} variant='primary'><PlusIcon className='w-4 stroke-width-3' /></Button>
        <Button variant='primary'><CalendarIcon className='w-4 stroke-width-3' /></Button>
        <Button variant='primary'><MagnifyingGlassIcon className='w-4 stroke-width-3' /></Button>
      </div>
      <Modal dependency={showTaskModal} close={() => setShowTaskModal(!(showTaskModal === true))}>
        <AddTask />
      </Modal>
    </>
  )
}
