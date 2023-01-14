'use client'

import { StatsTasksInterface } from 'interfaces/tasks/Task'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  stats: StatsTasksInterface[]
}

export default function ProjectStats ({ stats }: Props): JSX.Element {
  return (
    <Swiper
      spaceBetween={40}
      slidesPerView={1}
    >
      {stats.map((element) => (
        <SwiperSlide key={element.id}>
          <div className='relative flex flex-col items-start text-black border-4 border-white group p-7 md:mb-0 --3xl dark:text-white'>
            <div className='text-4xl font-extrabold text-black font-secondaryFont dark:text-white'>
              {element.hours}
            </div>
            <span className='mt-1 text-3xl text-black font-secondaryFont dark:text-white'>{element.text}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
