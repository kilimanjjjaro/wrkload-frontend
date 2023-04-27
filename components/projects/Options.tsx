'use client'

import { useContext } from 'react'
import { PresentationChartLineIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'

import { ModalsContext } from 'contexts/ModalsContext'
import { AppContext } from 'contexts/AppContext'

export default function Options(): JSX.Element {
  const { setAddDataModalStatus, setSearchModalStatus } = useContext(ModalsContext)
  const { shouldRenderStats, setShouldRenderStats } = useContext(AppContext)

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
      <Button ariaLabel='Add project' className='!w-auto' onClick={() => setAddDataModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
      <Button ariaLabel='Search project' className='!w-auto' onClick={() => setSearchModalStatus(true)} variant='primary'><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
    </div>
  )
}
