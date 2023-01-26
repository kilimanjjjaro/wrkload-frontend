import { useContext, useState } from 'react'
import { CalendarIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import DateFilter from 'app/components/shared/DateFilter'

import { ModalsContext } from 'context/ModalsContext'

export default function Options (): JSX.Element {
  const { setAddDataModalStatus, setSearchModalStatus } = useContext(ModalsContext)
  const [showDateFilterBoxStatus, setShowDateFilterBoxStatus] = useState(false)

  return (
    <div className='flex items-start gap-x-5'>
      <Button onClick={() => setAddDataModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
      <Button onClick={() => setSearchModalStatus(true)} variant='primary'><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
      <div className='relative'>
        <Button onClick={() => setShowDateFilterBoxStatus(!(showDateFilterBoxStatus))} variant='primary'><CalendarIcon className='w-4 stroke-3' /></Button>
        <DateFilter dependency={showDateFilterBoxStatus} setDependency={setShowDateFilterBoxStatus} />
      </div>
    </div>
  )
}
