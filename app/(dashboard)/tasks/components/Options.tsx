import { useState } from 'react'
import { CalendarIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Modal from 'app/components/shared/Modal'
import AddTask from 'app/(dashboard)/tasks/components/AddTask'
import SearchForm from 'app/components/shared/SearchForm'
import DateFilter from 'app/components/shared/DateFilter'

export const Options = (): JSX.Element => {
  const [addTaskModalStatus, setAddTaskModalStatus] = useState(false)
  const [searchModalStatus, setSearchModalStatus] = useState(false)
  const [dateFilterModalStatus, setDateFilterModalStatus] = useState(false)

  return (
    <>
      <div className='flex items-start gap-x-5'>
        <Button onClick={() => setAddTaskModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-width-3' /></Button>
        <Button onClick={() => setSearchModalStatus(true)} variant='primary'><MagnifyingGlassIcon className='w-4 stroke-width-3' /></Button>
        <div className='relative'>
          <Button onClick={() => setDateFilterModalStatus(!(dateFilterModalStatus))} variant='primary'><CalendarIcon className='w-4 stroke-width-3' /></Button>
          <DateFilter dependency={dateFilterModalStatus} setDependency={setDateFilterModalStatus} />
        </div>
      </div>
      <Modal modalStatus={addTaskModalStatus} setModalStatus={setAddTaskModalStatus}>
        <AddTask setModalStatus={setAddTaskModalStatus} />
      </Modal>
      <Modal modalStatus={searchModalStatus} setModalStatus={setSearchModalStatus}>
        <SearchForm type='task' setModalStatus={setSearchModalStatus} />
      </Modal>
    </>
  )
}
