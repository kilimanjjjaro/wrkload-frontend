'use client'

import { useRouter } from 'next/navigation'
import Masonry from 'react-masonry-css'
import Balancer from 'react-wrap-balancer'
import Atropos from 'atropos/react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, CalendarIcon, ClockIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Button from 'components/shared/Button'

import 'atropos/css'

export default function HeroHeader (): JSX.Element {
  const router = useRouter()

  return (
    <section className='grid items-center gap-32 md:gap-10 md:h-screen md:grid-cols-2'>
      <div className='flex flex-col items-start text-black transition-colors ease-in-out dark:text-blue duration-400'>
        <Headline variant='2xl'>Work, load your <br className='hidden md:block' />time and go <br className='hidden md:block' />have fun!</Headline>
        <div className='mb-8 dark:text-white md:w-1/2'>
          <Paragraph variant='normal'><b className='font-extrabold'>Easy-peasy!</b></Paragraph>
          <Paragraph variant='normal'>With wrkload you can track what you&apos;ve worked on in a simple and organized way.</Paragraph>
        </div>
        <Button className='!w-auto' variant='primary' onClick={() => router.push('/registry')}>Start now for free <ArrowRightIcon className='w-4 stroke-3' /></Button>
      </div>
      <Masonry
        className='grid items-start grid-cols-2 gap-6'
        columnClassName='!w-full grid gap-y-2'
      >
        <motion.div
          className='will-change-transform'
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
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
              className='relative text-black transition ease-in-out p-7 bg-light-blue dark:bg-white rounded-3xl duration-400 group'
            >
              <h3 data-atropos-offset='3' className='!leading-10 md:mb-6 text-3xl mb-[1.4rem] font-primaryFont md:text-4xl md:leading-tight font-bold'>Prototype the Checkout Process in Figma</h3>
              <p data-atropos-offset='3' className='text-base break-word font-secondaryFont'><Balancer>Created a prototype for the checkout process of an ecommerce app in Figma. Designed and tested different user flows to ensure a seamless checkout experience, and added interactive elements to enhance the user experience.</Balancer></p>
              <div data-atropos-offset='3' className='flex flex-wrap gap-3 mt-4'>
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
              <div data-atropos-offset='3' className='absolute right-6 md:right-0 flex flex-col md:flex-row items-end justify-end md:justify-center md:w-full text-xs font-semibold tracking-widest text-black uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 md:-top-[0.9rem] xl:opacity-0 gap-2 md:gap-3 group-hover:opacity-100'>
                <div className='flex items-center justify-center w-8 h-8 transition ease-in-out rounded-full cursor-pointer duration-400 bg-yellow hover:bg-blue'>
                  <PencilSquareIcon className='w-4 stroke-2' />
                </div>
                <div className='flex items-center justify-center w-8 h-8 transition ease-in-out rounded-full cursor-pointer duration-400 bg-red hover:bg-blue'>
                  <TrashIcon className='w-4 stroke-2' />
                </div>
              </div>
            </article>
          </Atropos>
        </motion.div>
        <article className='p-6 scale-[0.75] bg-light-blue dark:bg-white md:p-7 rounded-3xl'>
          <div className='w-4/6 mb-4 xl:mb-5 h-9 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          <div className='w-full h-28 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-3xl animate-skeleton' />
          <div className='flex flex-wrap w-full gap-3 mt-4'>
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          </div>
        </article>
        <article className='p-6 mt-8 scale-[0.75] bg-light-blue dark:bg-white md:p-7 rounded-3xl'>
          <div className='w-4/6 mb-4 xl:mb-5 h-9 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          <div className='w-full h-28 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-3xl animate-skeleton' />
          <div className='flex flex-wrap w-full gap-3 mt-4'>
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          </div>
        </article>
        <article className='p-6 scale-[0.75] bg-light-blue dark:bg-white md:p-7 rounded-3xl'>
          <div className='w-4/6 mb-4 xl:mb-5 h-9 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          <div className='w-full h-28 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-3xl animate-skeleton' />
          <div className='flex flex-wrap w-full gap-3 mt-4'>
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full animate-skeleton' />
          </div>
        </article>
      </Masonry>
    </section>
  )
}
