import { useContext } from 'react'
import Balancer from 'react-wrap-balancer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import { ArrowDownIcon, ArrowUpIcon, PresentationChartLineIcon, ClockIcon, EyeSlashIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import { AppContext } from 'contexts/AppContext'
import type { TaskStatsInterface } from 'interfaces/tasks/Task'

export default function Stats ({ stats }: { stats: TaskStatsInterface }): JSX.Element {
  const { shouldRenderStats, setShouldRenderStats } = useContext(AppContext)

  const handleRenderStats = (): void => {
    setShouldRenderStats(!shouldRenderStats)
    window.localStorage.setItem('showStats', JSON.stringify(!shouldRenderStats))
  }

  const emptyStats = stats?.totalTasksPastMonth < 1 && stats?.totalTasksCurrentMonth < 1
  const performanceText = stats?.performance === 'better' ? 'better' : 'worse'

  return (
    <>
      {!emptyStats && (
        <Swiper
          className='relative w-full border-2 border-blue text-blue dark:text-blue dark:border-blue rounded-3xl'
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          speed={400}
          pagination={{ clickable: true }}
          grabCursor
        >
          <EyeSlashIcon className='absolute z-10 w-6 h-6 transition ease-in-out cursor-pointer stroke-2 duration-400 hover:text-black dark:hover:text-white top-7 right-7' onClick={handleRenderStats} />
          {stats?.totalCurrentMonthTiming > 0 && (
            <SwiperSlide className='pt-6 pl-6 pr-6 md:pt-7 pb-[45px] md:pb-[51px] md:pr-7 md:pl-7'>
              <ClockIcon className='h-10 stroke-2' />
              <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
                {stats.totalCurrentMonthTiming}
                <div className='relative flex items-center cursor-help group'>
                  {stats.performance === 'better' && <ArrowUpIcon className='w-4 stroke-green stroke-4' />}
                  {stats.performance === 'worse' && <ArrowDownIcon className='w-4 stroke-red stroke-4' />}
                  <div className='absolute text-black left-6 w-max tracking-widest font-bold leading-none text-[8px] uppercase font-secondaryFont text-center bg-blue py-[7px] px-[10px] invisible transition-all duration-400 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible rounded-full'>
                    Your current performance is being {performanceText}
                  </div>
                </div>
              </div>
              <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>hours worked<br /> in the current month.</span>
            </SwiperSlide>
          )}
          {stats?.totalTasksCurrentMonth > 0 && (
            <SwiperSlide className='p-6 md:pt-7 pb-[45px] md:pb-[51px] md:pr-7 md:pl-7'>
              <RectangleStackIcon className='h-10 stroke-2' />
              <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
                {stats.totalTasksCurrentMonth}
              </div>
              <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>tasks uploaded<br /> in the current month.</span>
            </SwiperSlide>
          )}
          {stats?.totalPastMonthTiming > 0 && (
            <SwiperSlide className='pt-6 pl-6 pr-6 pb-[45px] md:pb-[51px] md:pt-7 md:pr-7 md:pl-7'>
              <ClockIcon className='h-10 stroke-2' />
              <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
                {stats.totalPastMonthTiming}
              </div>
              <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>hours worked<br /> last month.</span>
            </SwiperSlide>
          )}
          {stats?.totalTasksPastMonth > 0 && (
            <SwiperSlide className=' p-6 md:pt-7 pb-[45px] md:pb-[51px] md:pr-7 md:pl-7'>
              <RectangleStackIcon className='h-10 stroke-2' />
              <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
                {stats.totalTasksPastMonth}
              </div>
              <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>tasks uploaded<br /> last month.</span>
            </SwiperSlide>
          )}
        </Swiper>
      )}
      {emptyStats && (
        <div className='relative text-blue border-blue dark:text-blue border-2 dark:border-blue p-6 md:pt-7 md:pb-[33px] md:pr-7 md:pl-7 rounded-3xl'>
          <EyeSlashIcon className='absolute z-10 w-6 h-6 transition ease-in-out cursor-pointer stroke-2 dark:text-blue duration-400 hover:text-black dark:hover:text-white top-7 right-7' onClick={handleRenderStats} />
          <PresentationChartLineIcon className='h-10 stroke-2' />
          <span className='block text-2xl text-black dark:text-white font-secondaryFont mt-7'><Balancer>We can&apos;t wait to show you stats but it looks like it&apos;s your first month or you didn&apos;t upload tasks last month.</Balancer></span>
        </div>
      )}
    </>
  )
}
