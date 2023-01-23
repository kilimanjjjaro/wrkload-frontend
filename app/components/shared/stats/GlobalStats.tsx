import { ArrowUpIcon, ArrowDownIcon, BanknotesIcon, ClockIcon, InboxStackIcon, FireIcon } from '@heroicons/react/24/outline'

import type { StatsInterface } from 'interfaces/components'

const stats: StatsInterface[] = [
  { type: 'totalTasks', value: '400', avg: 'better' },
  { type: 'totalMonthlyHours', value: '20', avg: 'worst' },
  { type: 'goals', value: '$1.000', avg: 'better' },
  { type: 'project', value: 'Bioland', avg: '' }
]

export default function GlobalStats (): JSX.Element {
  return (
    <div className='mt-10 gap-x-10 columns-1 md:columns-2 xl:columns-4'>
      {stats.map((stat, index) => (
        <div key={index} className='mb-6 text-white bg-dark-gray md:mb-0 p-7'>
          {stat.type === 'totalTasks' && <InboxStackIcon className='h-10 text-light-gray stroke-2' />}
          {stat.type === 'totalMonthlyHours' && <ClockIcon className='h-10 text-light-gray stroke-2' />}
          {stat.type === 'goals' && <BanknotesIcon className='h-10 text-light-gray stroke-2' />}
          {stat.type === 'project' && <FireIcon className='h-10 text-light-gray stroke-2' />}
          <div className='flex items-center text-4xl font-extrabold gap-x-1 mt-7 font-secondaryFont'>
            {stat.value}
            {stat.avg === 'better' && <ArrowUpIcon className='w-4 stroke-custom-green stroke-4' />}
            {stat.avg === 'worst' && <ArrowDownIcon className='w-4 stroke-custom-red stroke-4' />}
          </div>
          {stat.type === 'totalTasks' && <span className='mt-1 text-3xl font-secondaryFont'>tasks uploaded last month.</span>}
          {stat.type === 'totalMonthlyHours' && <span className='mt-1 text-3xl font-secondaryFont'>hours worked last month.</span>}
          {stat.type === 'goals' && <span className='mt-1 text-3xl font-secondaryFont'>Earned <br />goals.</span>}
          {stat.type === 'project' && <span className='mt-1 text-3xl font-secondaryFont'>Project of <br />the last month.</span>}
        </div>
      ))}
    </div>
  )
}
