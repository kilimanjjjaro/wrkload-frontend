import { FireIcon } from '@heroicons/react/24/outline'

import type { ProjectStatsInterface } from 'interfaces/projects/Project'

export default function Stats ({ stats }: { stats: ProjectStatsInterface }): JSX.Element {
  return (
    <div className='text-white bg-dark-gray pt-7 pb-[34px] pr-7 pl-7'>
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
