import { ArrowUpIcon, ArrowDownIcon, BanknotesIcon, ClockIcon, InboxStackIcon, FireIcon } from '@heroicons/react/24/outline'
import { StatsInterface } from 'interfaces/components'

const fetchStats = (): StatsInterface[] => {
  const stats = [
    { type: 'totalTasks', value: '400', avg: 'better' },
    { type: 'totalMonthlyHours', value: '20', avg: 'worst' },
    { type: 'goals', value: '$1.000', avg: 'better' },
    { type: 'project', value: 'Bioland', avg: '' }
  ]
  return stats
}

export default async function GlobalStats (): Promise<any> {
  const stats = await fetchStats()

  return (
    <div className='mt-10 gap-x-10 columns-1 md:columns-2 xl:columns-4'>
      {stats.map((stat, index) => (
        <div key={index} className='mb-6 text-white border-4 border-white md:mb-0 --3xl p-7 dark:text-white'>
          {stat.type === 'totalTasks' && <InboxStackIcon className='h-10 stroke-width-2' />}
          {stat.type === 'totalMonthlyHours' && <ClockIcon className='h-10 stroke-width-2' />}
          {stat.type === 'goals' && <BanknotesIcon className='h-10 stroke-width-2' />}
          {stat.type === 'project' && <FireIcon className='h-10 stroke-width-2' />}
          <div className='flex text-4xl font-extrabold text-white gap-x-1 mt-7 font-secondaryFont dark:text-white'>
            {stat.value}
            {stat.avg === 'better' && <ArrowUpIcon className='w-4 stroke-custom-green stroke-width-3' />}
            {stat.avg === 'worst' && <ArrowDownIcon className='w-4 stroke-custom-red stroke-width-3' />}
          </div>
          {stat.type === 'totalTasks' && <span className='mt-1 text-3xl text-white font-secondaryFont dark:text-white'>tasks uploaded last month.</span>}
          {stat.type === 'totalMonthlyHours' && <span className='mt-1 text-3xl text-white font-secondaryFont dark:text-white'>hours worked last month.</span>}
          {stat.type === 'goals' && <span className='mt-1 text-3xl text-white font-secondaryFont dark:text-white'>Earned <br />goals.</span>}
          {stat.type === 'project' && <span className='mt-1 text-3xl text-white font-secondaryFont dark:text-white'>Project of <br />the last month.</span>}
        </div>
      ))}
    </div>
  )
}
