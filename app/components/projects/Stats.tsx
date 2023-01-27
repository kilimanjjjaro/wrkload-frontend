import { FireIcon } from '@heroicons/react/24/outline'

import { PROJECT_STATS } from 'constants/projects'

export default function Stats (): JSX.Element {
  return (
    <div className='text-white bg-dark-gray pt-7 pb-[34px] pr-7 pl-7'>
      <FireIcon className='h-10 stroke-2 text-light-gray' />
      <div className='flex items-center text-4xl font-extrabold gap-x-1 mt-7 font-secondaryFont'>
        {PROJECT_STATS.value}
      </div>
      <span className='mt-1 text-3xl font-secondaryFont'>Project of<br /> the last month.</span>
    </div>
  )
}
