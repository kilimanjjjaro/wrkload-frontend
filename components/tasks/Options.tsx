import { useContext, useState } from 'react'
import { CalendarIcon, PresentationChartLineIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import DateFilter from 'components/shared/DateFilter'
import { ModalsContext } from 'contexts/ModalsContext'
import { DataContext } from 'contexts/DataContext'

export default function Options (): JSX.Element {
  const { setAddDataModalStatus, setSearchModalStatus } = useContext(ModalsContext)
  const { shouldRenderStats, setShouldRenderStats } = useContext(DataContext)
  const [showDateFilterBoxStatus, setShowDateFilterBoxStatus] = useState(false)

  const handleRenderStats = (): void => {
    setShouldRenderStats(!shouldRenderStats)
    window.localStorage.setItem('showStats', JSON.stringify(!shouldRenderStats))
  }

  const statsButtonText = shouldRenderStats ? 'Hide stats' : 'Show stats'

  return (
    <div className='flex items-start gap-x-5'>
      <Button onClick={handleRenderStats} variant='light-alternative' autoWidth>
        <PresentationChartLineIcon className='w-4 stroke-3' />
        <span className='hidden md:inline-block'>{statsButtonText}</span>
      </Button>
      <Button onClick={() => setAddDataModalStatus(true)} variant='primary' autoWidth><PlusIcon className='w-4 stroke-3' /></Button>
      <Button onClick={() => setSearchModalStatus(true)} variant='primary' autoWidth><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
      <div className='relative w-full md:w-auto'>
        <Button onClick={() => setShowDateFilterBoxStatus(!(showDateFilterBoxStatus))} variant='primary' autoWidth><CalendarIcon className='w-4 stroke-3' /></Button>
        <DateFilter dependency={showDateFilterBoxStatus} setDependency={setShowDateFilterBoxStatus} />
      </div>
    </div>
  )
}
