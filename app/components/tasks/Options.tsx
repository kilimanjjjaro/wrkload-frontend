import { useContext, useState } from 'react'
import { CalendarIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import DateFilter from 'app/components/shared/DateFilter'

import { DataContext } from 'context/DataContext'

export default function Options (): JSX.Element {
  const { setAddTaskModalStatus, setSearchModalStatus } = useContext(DataContext)
  const [dateFilterModalStatus, setDateFilterModalStatus] = useState(false)

  return (
    <div className='flex items-start gap-x-5'>
      <Button onClick={() => setAddTaskModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
      <Button onClick={() => setSearchModalStatus(true)} variant='primary'><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
      <div className='relative'>
        <Button onClick={() => setDateFilterModalStatus(!(dateFilterModalStatus))} variant='primary'><CalendarIcon className='w-4 stroke-3' /></Button>
        <DateFilter dependency={dateFilterModalStatus} setDependency={setDateFilterModalStatus} />
      </div>
    </div>
  )
}
