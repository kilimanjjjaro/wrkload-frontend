'use client'

import { Swiper } from 'swiper/react'
import 'swiper/css'

interface Props {
  variant: 'primary'
  children: React.ReactNode
}

export function Carousel ({ variant, children }: Props): JSX.Element {
  return (
    <>
      {variant === 'primary' && (
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {children}
        </Swiper>
      )}
    </>
  )
}
