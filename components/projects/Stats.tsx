import { useContext } from 'react'
import Balancer from 'react-wrap-balancer'
import { PresentationChartLineIcon, EyeSlashIcon, FireIcon } from '@heroicons/react/24/outline'
import { AppContext } from 'contexts/AppContext'
import type { ProjectStatsInterface } from 'interfaces/projects/Project'

export default function Stats ({ stats }: { stats: ProjectStatsInterface }): JSX.Element {
  const { shouldRenderStats, setShouldRenderStats } = useContext(AppContext)

  const handleRenderStats = (): void => {
    setShouldRenderStats(!shouldRenderStats)
    window.localStorage.setItem('showStats', JSON.stringify(!shouldRenderStats))
  }

  const bestProjectOfPastMonth = stats?.bestProjectOfPastMonth !== '' && stats?.bestProjectOfPastMonth !== undefined

  return (
    <div className='relative border-2 border-blue text-blue dark:text-blue dark:border-blue pt-6 md:pt-7 pb-[33px] pr-6 md:pr-7 pl-6 md:pl-7 rounded-3xl'>
      <EyeSlashIcon className='absolute z-10 w-6 h-6 transition ease-in-out cursor-pointer stroke-2 duration-400 hover:text-black dark:hover:text-white top-7 right-7' onClick={handleRenderStats} />
      {bestProjectOfPastMonth && <FireIcon className='h-10 stroke-2' />}
      {!bestProjectOfPastMonth && <PresentationChartLineIcon className='h-10 stroke-2' />}
      {bestProjectOfPastMonth && (
        <>
          <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
            {stats?.bestProjectOfPastMonth}
          </div>
          <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>Project of<br /> the last month.</span>
        </>
      )}
      {!bestProjectOfPastMonth && <span className='block text-2xl text-black dark:text-white font-secondaryFont mt-7'><Balancer>We can&apos;t wait to show you stats but it looks like it&apos;s your first month or you didn&apos;t upload tasks last month.</Balancer></span>}
    </div>
  )
}
