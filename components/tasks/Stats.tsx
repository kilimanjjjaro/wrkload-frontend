import { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import { ArrowDownIcon, ArrowUpIcon, ChartBarIcon, ClockIcon, EyeSlashIcon, InboxStackIcon } from '@heroicons/react/24/outline'
import { DataContext } from 'contexts/DataContext'
import type { TaskStatsInterface } from 'interfaces/tasks/Task'

export default function Stats ({ stats }: { stats: TaskStatsInterface }): JSX.Element {
  const { shouldRenderStats, setShouldRenderStats } = useContext(DataContext)

  const handleRenderStats = (): void => {
    setShouldRenderStats(!shouldRenderStats)
    window.localStorage.setItem('showStats', JSON.stringify(!shouldRenderStats))
  }

  const performanceText = stats.performance === 'better' ? 'better' : 'worse'

  return (
    <>
      {stats.totalTasksPastMonth >= 1 && (
        <Swiper
          className='relative w-full bg-light-pink'
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          speed={400}
          pagination={{ clickable: true }}
          grabCursor
        >
          <EyeSlashIcon className='absolute z-10 w-6 h-6 text-black transition ease-in-out cursor-pointer stroke-2 duration-400 hover:text-white top-7 right-7' onClick={handleRenderStats} />
          <SwiperSlide className='text-black pt-7 pb-[33px] pr-7 pl-7'>
            <ClockIcon className='h-10 text-black stroke-2' />
            <div className='flex items-center text-4xl font-bold gap-x-1 mt-7 font-primaryFont'>
              {stats.totalPastMonthTiming}
              {stats.performance === 'better' && (
                <div className='relative flex items-center cursor-help group'>
                  <ArrowUpIcon className='w-4 stroke-green stroke-4' />
                  <div className='absolute left-6 min-w-[167px] text-xs text-center text-pink bg-black p-2 invisible transition-all duration-400 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible'>
                    Your current performance is being {performanceText}
                  </div>
                </div>
              )}
              {stats.performance === 'worst' && <ArrowDownIcon className='w-4 stroke-red stroke-4' />}
            </div>
            <span className='mt-1 text-2xl font-secondaryFont'>hours worked<br /> past month.</span>
          </SwiperSlide>
          <SwiperSlide className='text-black pt-7 pb-[33px] pr-7 pl-7'>
            <InboxStackIcon className='h-10 text-black stroke-2' />
            <div className='flex items-center text-4xl font-bold gap-x-1 mt-7 font-primaryFont'>
              {stats.totalTasksPastMonth}
            </div>
            <span className='mt-1 text-2xl font-secondaryFont'>tasks uploaded<br /> past month.</span>
          </SwiperSlide>
        </Swiper>
      )}
      {stats.totalTasksPastMonth < 1 && (
        <div className='relative text-black bg-light-pink pt-7 pb-[34px] pr-7 pl-7'>
          <EyeSlashIcon className='absolute z-10 w-6 h-6 text-black transition ease-in-out cursor-pointer stroke-2 duration-400 hover:text-white top-7 right-7' onClick={handleRenderStats} />
          <ChartBarIcon className='h-10 text-black stroke-2' />
          <span className='block text-2xl font-secondaryFont mt-7'>We can&apos;t wait to show you stats but it looks like it&apos;s your first month or you didn&apos;t upload tasks last month.</span>
        </div>
      )}
    </>
  )
}