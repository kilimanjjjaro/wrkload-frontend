'use client'

import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import Atropos from 'atropos/react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, CalendarIcon, ClockIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Masonry from 'react-masonry-css'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Button from 'components/shared/Button'
import 'atropos/css'

export default function IntroducingTasks (): JSX.Element {
  const router = useRouter()

  return (
    <motion.header
      className='grid items-center gap-10 mb-20 mt-44 md:mt-0 md:mb-0 md:min-h-screen md:grid-cols-2'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className='flex flex-col items-start text-black transition-colors ease-in-out dark:text-blue duration-400'>
        <Headline variant='2xl'><Balancer>Work, load your time and go have fun!</Balancer></Headline>
        <div className='mb-8 dark:text-white md:w-2/3'>
          <Paragraph variant='normal'><b className='font-extrabold'>Easy-peasy!</b></Paragraph>
          <Paragraph variant='normal'><Balancer>With wrkload you can track what you&apos;ve worked on in a simple and organized way.</Balancer></Paragraph>
        </div>
        <Button className='!w-auto' variant='primary' onClick={() => router.push('/registry')}>Start now for free <ArrowRightIcon className='w-4 stroke-3' /></Button>
      </div>
      <Masonry
        className='grid items-start md:grid-cols-2 gap-y-6 xl:gap-y-0'
        columnClassName='!w-full grid'
      >
        <Atropos
          rotateXMax={100}
          rotateYMax={100}
          activeOffset={200}
          duration={600}
          shadow={false}
        >
          <article
            data-atropos-offset='6'
            className='relative flex transition ease-in-out border-2 p-7 border-blue dark:border-blue rounded-3xl duration-400 group will-change-transform'
          >
            <div data-atropos-offset='2' className='will-change-transform'>
              <h3 className='!leading-10 md:mb-6 text-3xl mb-[1.4rem] text-black dark:text-blue font-primaryFont md:text-4xl md:leading-tight font-bold'>Prototype the <br />Checkout Process <br />in Figma</h3>
              <p className='text-base text-black break-word font-secondaryFont dark:text-white'><Balancer>Created a prototype for the checkout process of an ecommerce app in Figma. Designed and tested different user flows to ensure a seamless checkout experience, and added interactive elements to enhance the user experience.</Balancer></p>
              <div className='flex flex-wrap gap-3 mt-4'>
                <div className='relative flex items-center justify-center h-8 px-4 text-xs text-black rounded-full group/tooltip-1 bg-blue gap-x-1 font-secondaryFont'>
                  <CalendarIcon className='w-4 stroke-2' />
                  05/09/2022
                  <div data-atropos-offset='-3' className='absolute invisible tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out opacity-0 top-7 bg-white dark:bg-light-blue duration-400 group-hover/tooltip-1:opacity-100 group-hover/tooltip-1:visible rounded-full'>
                    Delivery date
                  </div>
                </div>
                <div className='relative flex items-center justify-center h-8 px-4 text-xs text-black rounded-full group/tooltip-2 bg-blue gap-x-1 font-secondaryFont'>
                  <ClockIcon className='w-4 stroke-2' />
                  3:30
                  <div data-atropos-offset='-3' className='absolute invisible tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out opacity-0 top-7 bg-white dark:bg-light-blue duration-400 group-hover/tooltip-2:opacity-100 group-hover/tooltip-2:visible rounded-full'>
                    Timing
                  </div>
                </div>
              </div>
            </div>
            <div className='absolute right-6 md:right-0 flex flex-col md:flex-row items-end justify-end md:justify-center md:w-full text-xs font-semibold tracking-widest text-black uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 md:-top-[1.05rem] xl:opacity-0 gap-2 md:gap-3 group-hover:opacity-100'>
              <div className='flex items-center justify-center w-8 h-8 transition ease-in-out rounded-full cursor-pointer duration-400 bg-yellow hover:bg-blue'>
                <PencilSquareIcon className='w-4 stroke-2' />
              </div>
              <div className='flex items-center justify-center w-8 h-8 transition ease-in-out rounded-full cursor-pointer duration-400 bg-red hover:bg-blue'>
                <TrashIcon className='w-4 stroke-2' />
              </div>
            </div>
          </article>
        </Atropos>
        <article className='p-6 xl:-mb-3 xl:scale-[0.75] bg-light-blue dark:bg-blue md:p-7 rounded-3xl transition duration-400 ease-in-out'>
          <div className='w-4/6 mb-4 xl:mb-5 h-9 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          <div className='w-full h-28 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-3xl animate-skeleton' />
          <div className='flex flex-wrap w-full gap-3 mt-4'>
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          </div>
        </article>
        <article className='p-6 mt-5 hidden 2xl:block xl:scale-[0.75] bg-light-blue dark:bg-blue md:p-7 rounded-3xl transition duration-400 ease-in-out'>
          <div className='w-4/6 mb-4 xl:mb-5 h-9 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          <div className='w-full h-28 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-3xl animate-skeleton' />
          <div className='flex flex-wrap w-full gap-3 mt-4'>
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          </div>
        </article>
        <article className='p-6 hidden xl:block xl:scale-[0.75] bg-light-blue dark:bg-blue md:p-7 rounded-3xl transition duration-400 ease-in-out'>
          <div className='w-4/6 mb-4 xl:mb-5 h-9 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          <div className='w-full h-28 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-3xl animate-skeleton' />
          <div className='flex flex-wrap w-full gap-3 mt-4'>
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-white/30 to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          </div>
        </article>
      </Masonry>
    </motion.header>
  )
}
