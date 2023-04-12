'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Balancer from 'react-wrap-balancer'
import { ArrowUpIcon, ArrowDownIcon, ClockIcon, FireIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'

const CONTAINER_VARIANTS = {
  visible: {
    borderRadius: '0rem',
    y: 0
  },
  hidden: {
    borderRadius: '20rem 20rem 0rem 0rem',
    y: 200
  }
}

const CONTENT_VARIANTS = {
  visible: {
    opacity: 1,
    y: 0
  },
  hidden: {
    opacity: 0,
    y: 200
  }
}

export default function IntroducingStats (): JSX.Element {
  const containerRef = useRef(null)
  const statsRef = useRef(null)
  const contentRef = useRef(null)
  const isInViewContainer = useInView(containerRef, { once: true })
  const isInViewStats = useInView(statsRef, { once: true })
  const isInViewContent = useInView(contentRef, { once: true })

  return (
    <motion.section
      ref={containerRef}
      className='px-6 md:px-8 xl:px-[5.5vw] 2xl:px-[6vw] py-24 xl:sticky xl:top-0 grid items-center gap-6 2xl:gap-32 bg-[#e3e5ea] dark:bg-[#0f1012] md:min-h-screen md:grid-cols-2'
      variants={CONTAINER_VARIANTS}
      animate={isInViewContainer ? 'visible' : 'hidden'}
      initial='hidden'
      transition={{
        duration: 0.8,
        ease: 'easeOut'
      }}
    >
      <motion.div
        ref={statsRef}
        className='grid items-start gap-6 2xl:gap-10 md:grid-cols-2'
        variants={CONTENT_VARIANTS}
        animate={isInViewStats ? 'visible' : 'hidden'}
        initial='hidden'
        transition={{
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.1
        }}
      >
        <article className='pb-6 transition ease-in-out border-2 pt-7 pr-7 pl-7 border-blue text-blue dark:text-blue dark:border-blue rounded-3xl duration-400 group'>
          <RectangleStackIcon className='h-10 stroke-2' />
          <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
            87
            <div className='relative flex items-center'>
              <ArrowUpIcon className='w-4 stroke-green stroke-4' />
              <div className='absolute text-black left-6 w-max max-w-[170px] 2xl:max-w-none tracking-widest font-bold leading-none text-[8px] uppercase font-secondaryFont text-center bg-blue py-[7px] px-[10px] invisible transition-all duration-400 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible rounded-full'>
                Your current performance is being better
              </div>
            </div>
          </div>
          <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>tasks uploaded<br /> in the current month.</span>
        </article>

        <article className='transition ease-in-out border-2 pt-7 pr-7 pb-6 pl-7 border-blue text-blue dark:text-blue dark:border-blue rounded-3xl duration-400 xl:scale-[0.75]'>
          <ClockIcon className='h-10 stroke-2' />
          <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
            102
          </div>
          <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>hours worked<br /> the current month.</span>
        </article>

        <article className='transition ease-in-out border-2 pt-7 pr-7 pb-6 pl-7 border-blue text-blue dark:text-blue dark:border-blue rounded-3xl duration-400 xl:scale-[0.75]'>
          <FireIcon className='h-10 stroke-2' />
          <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
            Nike
          </div>
          <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>Project of<br /> the past month.</span>
        </article>

        <article className='pb-6 transition ease-in-out border-2 pt-7 pr-7 pl-7 border-blue text-blue dark:text-blue dark:border-blue rounded-3xl duration-400 group'>
          <ClockIcon className='h-10 stroke-2' />
          <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
            48
            <div className='relative flex items-center'>
              <ArrowDownIcon className='w-4 stroke-red stroke-4' />
              <div className='absolute text-black left-6 w-max max-w-[170px] 2xl:max-w-none tracking-widest font-bold leading-none text-[8px] uppercase font-secondaryFont text-center bg-blue py-[7px] px-[10px] invisible transition-all duration-400 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible rounded-full'>
                Your performance last month was worse
              </div>
            </div>
          </div>
          <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>hours worked<br /> last month.</span>
        </article>
      </motion.div>
      <motion.div
        ref={contentRef}
        className='flex flex-col items-start text-black transition-colors ease-in-out dark:text-blue duration-400'
        variants={CONTENT_VARIANTS}
        animate={isInViewContent ? 'visible' : 'hidden'}
        initial='hidden'
        transition={{
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.4
        }}
      >
        <Headline variant='2xl' className='!mb-10'><Balancer>All you need in one blink!</Balancer></Headline>
        <div className='dark:text-white md:w-3/4'>
          <Paragraph variant='normal'>You can control in detail the time you worked on a project and extra data associated with it. All in the same place.</Paragraph>
        </div>
      </motion.div>
    </motion.section>
  )
}
