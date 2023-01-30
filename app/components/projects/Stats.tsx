import { useContext } from 'react'
import { EyeSlashIcon, FireIcon } from '@heroicons/react/24/outline'

import { DataContext } from 'context/DataContext'
import type { ProjectStatsInterface } from 'interfaces/projects/Project'

export default function Stats ({ stats }: { stats: ProjectStatsInterface }): JSX.Element {
  const { shouldRenderStats, setShouldRenderStats } = useContext(DataContext)

  return (
    <div className='relative text-white bg-dark-gray pt-7 pb-[34px] pr-7 pl-7'>
      <EyeSlashIcon className='absolute z-10 w-6 h-6 transition ease-in-out cursor-pointer stroke-2 duration-400 hover:text-white text-light-gray top-7 right-7' onClick={() => setShouldRenderStats(!shouldRenderStats)} />
      <FireIcon className='h-10 stroke-2 text-light-gray' />
      {stats.bestProjectOfPastMonth !== '' && (
        <>
          <div className='flex items-center text-4xl font-extrabold gap-x-1 mt-7 font-secondaryFont'>
            {stats.bestProjectOfPastMonth}
          </div>
          <span className='mt-1 text-3xl font-secondaryFont'>Project of<br /> the last month.</span>
        </>
      )}
      {stats.bestProjectOfPastMonth === '' && <span className='block text-3xl font-secondaryFont mt-7'>We can&apos;t wait to show you stats but it looks like it&apos;s your first month.</span>}
    </div>
  )
}
