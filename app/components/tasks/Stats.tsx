import { Dispatch } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import { ArrowDownIcon, ArrowUpIcon, ClockIcon, EyeSlashIcon, InboxStackIcon } from '@heroicons/react/24/outline'

import { TASK_STATS } from 'constants/tasks'

interface Props {
  shouldRender: Dispatch<React.SetStateAction<boolean>>
}

export default function Stats ({ shouldRender }: Props): JSX.Element {
  return (
    <Swiper
      className='relative w-full'
      modules={[Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 4000 }}
      speed={400}
      pagination={{ clickable: true }}
      grabCursor
    >
      <EyeSlashIcon className='absolute z-10 w-6 h-6 transition ease-in-out cursor-pointer stroke-2 duration-400 hover:text-white text-light-gray top-7 right-7' onClick={() => shouldRender(false)} />
      <SwiperSlide className='text-white bg-dark-gray pt-7 pb-[33px] pr-7 pl-7'>
        <InboxStackIcon className='h-10 stroke-2 text-light-gray' />
        <div className='flex items-center text-4xl font-bold gap-x-1 mt-7 font-primaryFont'>
          {TASK_STATS[1].value}
          {TASK_STATS[1].avg === 'better' && <ArrowUpIcon className='w-4 stroke-custom-green stroke-4' />}
          {TASK_STATS[1].avg === 'worst' && <ArrowDownIcon className='w-4 stroke-custom-red stroke-4' />}
        </div>
        <span className='mt-1 text-2xl font-secondaryFont'>tasks uploaded<br /> last month.</span>
      </SwiperSlide>
      <SwiperSlide className='text-white bg-dark-gray pt-7 pb-[33px] pr-7 pl-7'>
        <ClockIcon className='h-10 stroke-2 text-light-gray' />
        <div className='flex items-center text-4xl font-bold gap-x-1 mt-7 font-primaryFont'>
          {TASK_STATS[0].value}
        </div>
        <span className='mt-1 text-2xl font-secondaryFont'>hours worked<br /> last month.</span>
      </SwiperSlide>
    </Swiper>
  )
}
