import { useContext } from 'react'
import Balancer from 'react-wrap-balancer'
import { ChartBarIcon, EyeSlashIcon, FireIcon } from '@heroicons/react/24/outline'
import { DataContext } from 'contexts/DataContext'
import type { ProjectStatsInterface } from 'interfaces/projects/Project'

export default function Stats ({ stats }: { stats: ProjectStatsInterface }): JSX.Element {
  const { shouldRenderStats, setShouldRenderStats } = useContext(DataContext)

  const handleRenderStats = (): void => {
    setShouldRenderStats(!shouldRenderStats)
    window.localStorage.setItem('showStats', JSON.stringify(!shouldRenderStats))
  }

  return (
    <div className='relative text-blue border-2 border-blue bg-black pt-7 pb-[34px] pr-7 pl-7'>
      <EyeSlashIcon className='absolute z-10 w-6 h-6 transition ease-in-out cursor-pointer stroke-2 duration-400 hover:text-white top-7 right-7' onClick={handleRenderStats} />
      {stats.bestProjectOfPastMonth !== '' && <FireIcon className='h-10 stroke-2' />}
      {stats.bestProjectOfPastMonth === '' && <ChartBarIcon className='h-10 stroke-2' />}
      {stats.bestProjectOfPastMonth !== '' && (
        <>
          <div className='flex items-center text-4xl font-extrabold text-white gap-x-1 mt-7 font-secondaryFont'>
            {stats.bestProjectOfPastMonth}
          </div>
          <span className='mt-1 text-3xl text-white font-secondaryFont'>Project of<br /> the last month.</span>
        </>
      )}
      {stats.bestProjectOfPastMonth === '' && <span className='block text-2xl text-white font-secondaryFont mt-7'><Balancer>We can&apos;t wait to show you stats but it looks like it&apos;s your first month or you didn&apos;t upload tasks last month.</Balancer></span>}
    </div>
  )
}
