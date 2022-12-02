'use client'

import { SwiperSlide } from 'swiper/react'
import 'swiper/css'

interface Props {
  children: React.ReactNode
}

export function CarouselItem ({ children }: Props): JSX.Element {
  return (
    <SwiperSlide>
      {children}
    </SwiperSlide>
  )
}
