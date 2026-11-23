'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react'
import { wrap } from '@motionone/utils'
import { MS_PER_SECOND } from 'constants/math'

interface Props {
  children: React.ReactNode
  baseVelocity: number
}

const FORWARD = 1
const BACKWARD = -1
const INITIAL_X = 0
const NO_VELOCITY = 0
const MAX_SCROLL_VELOCITY = 1000
const MAX_VELOCITY_FACTOR = 5
const VELOCITY_DAMPING = 50
const VELOCITY_STIFFNESS = 400
const WRAP_START_PERCENT = -20
const WRAP_END_PERCENT = -45

function ParallaxText({ children, baseVelocity }: Props): React.JSX.Element {
  const directionFactor = useRef<number>(FORWARD)
  const baseX = useMotionValue(INITIAL_X)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: VELOCITY_DAMPING,
    stiffness: VELOCITY_STIFFNESS
  })
  const velocityFactor = useTransform(
    smoothVelocity,
    [NO_VELOCITY, MAX_SCROLL_VELOCITY],
    [NO_VELOCITY, MAX_VELOCITY_FACTOR],
    { clamp: false }
  )

  const x = useTransform(
    baseX,
    (v) => `${wrap(WRAP_START_PERCENT, WRAP_END_PERCENT, v)}%`
  )

  useAnimationFrame((_, delta) => {
    let moveBy =
      directionFactor.current * baseVelocity * (delta / MS_PER_SECOND)

    if (velocityFactor.get() < NO_VELOCITY) {
      directionFactor.current = BACKWARD
    } else if (velocityFactor.get() > NO_VELOCITY) {
      directionFactor.current = FORWARD
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className='flex overflow-hidden whitespace-nowrap flex-nowrap'>
      <motion.div
        className='flex flex-nowrap whitespace-nowrap text-blue text-6xl leading-[1.2] font-primaryFont md:text-6xl xl:text-7xl 2xl:text-[5.5rem] md:leading-[1.1]! will-change-transform'
        style={{ x }}
      >
        <span className='mr-6'>{children}</span>
        <span className='mr-6'>{children}</span>
        <span className='mr-6'>{children}</span>
        <span className='mr-6'>{children}</span>
      </motion.div>
    </div>
  )
}

export default function Features(): React.JSX.Element {
  return (
    <section className='mb-6 xl:mb-10'>
      <ParallaxText baseVelocity={-1}>
        Your best way to control your work{' '}
        <span className='text-[#0f1012]'>/</span>
      </ParallaxText>
      <ParallaxText baseVelocity={1.5}>
        Without chaos at payday <span className='text-[#0f1012]'>/</span>
      </ParallaxText>
    </section>
  )
}

// Credits: https://codesandbox.io/s/framer-motion-scroll-velocity-r1dy4u
