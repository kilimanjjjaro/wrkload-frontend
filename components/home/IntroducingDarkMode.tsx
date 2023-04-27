'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ReactCompareImage from 'react-compare-image'
import Balancer from 'react-wrap-balancer'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

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

export default function IntroducingDarkMode (): JSX.Element {
  const containerRef = useRef(null)
  const leftColumnRef = useRef(null)
  const rightColumnRef = useRef(null)
  const isInViewContainer = useInView(containerRef, { once: true })
  const isInViewLeftColumn = useInView(leftColumnRef, { once: true })
  const isInViewRightColumn = useInView(rightColumnRef, { once: true })

  return (
    <motion.section
      ref={containerRef}
      className='px-6 md:px-8 xl:px-[5vw] 2xl:px-[6vw] py-24 xl:sticky xl:top-0 grid items-center gap-8 xl:gap-0 2xl:gap-32 bg-[#ced2e0] dark:bg-[#121316] md:min-h-screen xl:grid-cols-8 2xl:grid-cols-2 will-change-transform'
      variants={CONTAINER_VARIANTS}
      animate={isInViewContainer ? 'visible' : 'hidden'}
      initial='hidden'
      transition={{
        duration: 0.8,
        ease: 'easeOut'
      }}
    >
      <motion.div
        ref={leftColumnRef}
        className='relative flex justify-center order-2 w-full p-6 md:p-10 md:grid-cols-2 xl:col-span-4 2xl:col-span-1 xl:order-1 will-change-transform bg-blue rounded-3xl group'
        variants={CONTENT_VARIANTS}
        animate={isInViewLeftColumn ? 'visible' : 'hidden'}
        initial='hidden'
        transition={{
          duration: 0.4,
          ease: 'easeOut',
          delay: 0.2
        }}
      >
        <ReactCompareImage
          leftImage='/images/dark-mode-1.webp'
          leftImageAlt='Dark Mode'
          leftImageCss={{ borderRadius: '1.5rem' }}
          rightImage='/images/dark-mode-2.webp'
          rightImageAlt='Light Mode'
          rightImageCss={{ borderRadius: '1.5rem' }}
          sliderLineWidth={6}
          sliderLineColor='#7686b7'
          handle={
            <div className='flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-light-blue'>
              <ChevronLeftIcon className='w-4 h-4 stroke-3 text-blue' />
              <ChevronRightIcon className='w-4 h-4 stroke-3 text-blue' />
            </div>
          }
        />
        <div className='absolute -top-2 text-black tracking-widest font-bold leading-none text-[8px] uppercase font-secondaryFont text-center bg-light-blue py-[7px] px-[10px] rounded-full opacity-100 group-hover:opacity-0 transition-opacity ease-in-out duration-400 animate-bounce'>
          Move the slider line to see the difference!
        </div>
      </motion.div>
      <motion.div
        ref={rightColumnRef}
        className='flex flex-col items-start order-1 text-black transition-colors ease-in-out xl:order-2 dark:text-blue duration-400 xl:col-start-6 xl:col-end-9 2xl:col-start-2 2xl:col-end-3 will-change-transform'
        variants={CONTENT_VARIANTS}
        animate={isInViewRightColumn ? 'visible' : 'hidden'}
        initial='hidden'
        transition={{
          duration: 0.4,
          ease: 'easeOut',
          delay: 0.4
        }}
      >
        <Headline variant='2xl' className='!mb-10'><Balancer>Discover the Dark Side of wrkload!</Balancer></Headline>
        <div className='dark:text-white'>
          <Paragraph variant='normal'><Balancer>With our dark mode, you can enjoy a more relaxed and focused user experience. The interface will help you work without eye strain and optimize your device&apos;s battery.</Balancer></Paragraph>
        </div>
      </motion.div>
    </motion.section>
  )
}
