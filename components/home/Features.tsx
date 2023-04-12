'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'
import { wrap } from '@motionone/utils'

interface Props {
  children: React.ReactNode
  baseVelocity: number
}

function ParallaxText ({ children, baseVelocity = 100 }: Props): JSX.Element {
  const directionFactor = useRef<number>(1)
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className='flex overflow-hidden whitespace-nowrap flex-nowrap'>
      <motion.div className='flex flex-nowrap whitespace-nowrap text-blue text-6xl leading-[1.2] font-primaryFont md:text-6xl xl:text-7xl 2xl:text-[5.5rem] 2xl:leading-[1.1]' style={{ x }}>
        <span className='mr-6'>{children}</span>
        <span className='mr-6'>{children}</span>
        <span className='mr-6'>{children}</span>
        <span className='mr-6'>{children}</span>
      </motion.div>
    </div>
  )
}

export default function Features (): JSX.Element {
  return (
    <section className='mb-10'>
      <ParallaxText baseVelocity={-1}>Your best way to control your work <span className='text-[#0f1012]'>/</span></ParallaxText>
      <ParallaxText baseVelocity={1.5}>Without chaos at payday <span className='text-[#0f1012]'>/</span></ParallaxText>
    </section>
  )
}

// Credits: https://codesandbox.io/s/framer-motion-scroll-velocity-r1dy4u
