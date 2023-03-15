import { useContext, useState } from 'react'
import { CalendarIcon, PresentationChartLineIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import DateFilter from 'components/shared/DateFilter'
import { ModalsContext } from 'contexts/ModalsContext'
import { AppContext } from 'contexts/AppContext'

export default function Options (): JSX.Element {
  const { setAddDataModalStatus, setSearchModalStatus } = useContext(ModalsContext)
  const { shouldRenderStats, setShouldRenderStats } = useContext(AppContext)
  const [showDateFilterBoxStatus, setShowDateFilterBoxStatus] = useState(false)

  const handleRenderStats = (): void => {
    setShouldRenderStats(!shouldRenderStats)
    window.localStorage.setItem('showStats', JSON.stringify(!shouldRenderStats))
  }

  const statsButtonText = shouldRenderStats ? 'Hide stats' : 'Show stats'

  return (
    <div className='flex items-start gap-x-5'>
      <Button className='!w-auto' onClick={handleRenderStats} variant='light-alternative'>
        <PresentationChartLineIcon className='w-4 stroke-3' />
        <span className='hidden md:inline-block'>{statsButtonText}</span>
      </Button>
      <Button className='!w-auto' onClick={() => setAddDataModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
      <Button className='!w-auto' onClick={() => setSearchModalStatus(true)} variant='primary'><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
      <div className='relative'>
        <Button className='!w-auto' onClick={() => setShowDateFilterBoxStatus(!(showDateFilterBoxStatus))} variant='primary'><CalendarIcon className='w-4 stroke-3' /></Button>
        <DateFilter dependency={showDateFilterBoxStatus} setDependency={setShowDateFilterBoxStatus} />
      </div>
    </div>
  )
}
