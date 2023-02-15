import { useContext, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import { ArrowDownIcon, ArrowUpIcon, ChartBarIcon, ClockIcon, EyeSlashIcon, InboxStackIcon } from '@heroicons/react/24/outline'

import { DataContext } from 'context/DataContext'
import type { TaskStatsInterface } from 'interfaces/tasks/Task'

export default function Stats ({ stats }: { stats: TaskStatsInterface }): JSX.Element {
  const { shouldRenderStats, setShouldRenderStats } = useContext(DataContext)
  
  const handleRenderStats = () => {
    setShouldRenderStats(!shouldRenderStats)
    window.localStorage.setItem('showStats', JSON.stringify(!shouldRenderStats))
  }

  return (
    <>
      {stats.totalTasksPastMonth >= 1 && (
        <Swiper
          className='relative w-full bg-dark-gray'
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          speed={400}
          pagination={{ clickable: true }}
          grabCursor
        >
          <EyeSlashIcon className='absolute z-10 w-6 h-6 transition ease-in-out cursor-pointer stroke-2 duration-400 hover:text-white text-light-gray top-7 right-7' onClick={handleRenderStats} />
          <SwiperSlide className='text-white pt-7 pb-[33px] pr-7 pl-7'>
            <InboxStackIcon className='h-10 stroke-2 text-light-gray' />
            <div className='flex items-center text-4xl font-bold gap-x-1 mt-7 font-primaryFont'>
              {stats.totalTasksPastMonth}
              {stats.performance === 'better' && <ArrowUpIcon className='w-4 stroke-custom-green stroke-4' />}
              {stats.performance === 'worst' && <ArrowDownIcon className='w-4 stroke-custom-red stroke-4' />}
            </div>
            <span className='mt-1 text-2xl font-secondaryFont'>tasks uploaded<br /> past month.</span>
          </SwiperSlide>
          <SwiperSlide className='text-white pt-7 pb-[33px] pr-7 pl-7'>
            <ClockIcon className='h-10 stroke-2 text-light-gray' />
            <div className='flex items-center text-4xl font-bold gap-x-1 mt-7 font-primaryFont'>
              {stats.totalPastMonthTiming}
            </div>
            <span className='mt-1 text-2xl font-secondaryFont'>hours worked<br /> past month.</span>
          </SwiperSlide>
        </Swiper>
      )}
      {stats.totalTasksPastMonth < 1 && (
        <div className='relative text-white bg-dark-gray pt-7 pb-[34px] pr-7 pl-7'>
          <EyeSlashIcon className='absolute z-10 w-6 h-6 transition ease-in-out cursor-pointer stroke-2 duration-400 hover:text-white text-light-gray top-7 right-7' onClick={handleRenderStats} />
          <ChartBarIcon className='h-10 stroke-2 text-light-gray' />
          <span className='block text-2xl font-secondaryFont mt-7'>We can&apos;t wait to show you stats but it looks like it&apos;s your first month or you didn&apos;t upload tasks last month.</span>
        </div>
      )}
    </>
  )
}
