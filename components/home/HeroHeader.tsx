'use client'

import { useRouter } from 'next/navigation'
import Masonry from 'react-masonry-css'
import Balancer from 'react-wrap-balancer'
import Atropos from 'atropos/react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ArrowRightIcon, ArrowUpIcon, CalendarIcon, ClockIcon, FireIcon, PencilSquareIcon, RectangleStackIcon, TrashIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Button from 'components/shared/Button'
import 'atropos/css'

export default function HeroHeader (): JSX.Element {
  const router = useRouter()

  return (
    <>
      <section className='grid items-center gap-10 md:h-screen md:grid-cols-2'>
        <div className='overflow-hidden'>
          <div className='flex flex-col items-start text-black transition-colors ease-in-out dark:text-blue duration-400'>
            <Headline variant='2xl'><Balancer>Work, load your time and go have fun!</Balancer></Headline>
            <div className='mb-8 dark:text-white md:w-1/2'>
              <Paragraph variant='normal'><b className='font-extrabold'>Easy-peasy!</b></Paragraph>
              <Paragraph variant='normal'>With wrkload you can track what you&apos;ve worked on in a simple and organized way.</Paragraph>
            </div>
            <Button className='!w-auto' variant='primary' onClick={() => router.push('/registry')}>Start now for free <ArrowRightIcon className='w-4 stroke-3' /></Button>
          </div>
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
              <motion.div
                className='absolute hidden left-0 right-0 xl:flex justify-center items-center w-[94px] transition-opacity duration-400 ease-in-out h-8 mx-auto text-sm text-black bg-blue dark:bg-white rounded-full -top-[1.05rem] font-secondaryFont group-hover:opacity-0'
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              >
                Hover me!
              </motion.div>
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
      </section>
      {/* <section className='grid items-center gap-10 md:h-screen md:grid-cols-2'>
        <div className='flex flex-col items-start text-black transition-colors ease-in-out dark:text-blue duration-400'>
          <Headline variant='2xl'><Balancer>All you need in one blink!</Balancer></Headline>
          <div className='mb-8 dark:text-white md:w-1/2'>
            <Paragraph variant='normal'>You can control in detail the time you worked on a project and extra data associated with it. All in the same place.</Paragraph>
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
              className='relative pb-6 transition ease-in-out border-2 pt-7 pr-7 pl-7 border-blue text-blue dark:text-blue dark:border-blue rounded-3xl duration-400 will-change-transform group'
            >
              <motion.div
                className='absolute hidden left-0 right-0 xl:flex justify-center items-center w-[94px] transition-opacity duration-400 ease-in-out h-8 mx-auto text-sm text-black bg-blue dark:bg-white rounded-full -top-[1.05rem] font-secondaryFont group-hover:opacity-0'
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              >
                Hover me!
              </motion.div>
              <div data-atropos-offset='2' className='will-change-transform'>
                <RectangleStackIcon className='h-10 stroke-2' />
                <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
                  202
                  <div className='relative flex items-center'>
                    <ArrowUpIcon className='w-4 stroke-green stroke-4' />
                    <div className='absolute text-black left-6 w-max tracking-widest font-bold leading-none text-[8px] uppercase font-secondaryFont text-center bg-blue py-[7px] px-[10px] invisible transition-all duration-400 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible rounded-full'>
                      Your current performance is being better
                    </div>
                  </div>
                </div>
                <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>tasks uploaded<br /> the current month.</span>
              </div>
            </article>
          </Atropos>
          <article
            data-atropos-offset='6'
            className='transition ease-in-out border-2 pt-7 pr-7 pb-6 pl-7 border-blue text-blue dark:text-blue dark:border-blue rounded-3xl duration-400 xl:scale-[0.75]'
          >
            <ClockIcon className='h-10 stroke-2' />
            <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
              102
            </div>
            <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>hours worked<br /> last month.</span>
          </article>
          <article
            data-atropos-offset='6'
            className='transition ease-in-out mt-8 border-2 pt-7 pr-7 pb-6 pl-7 border-blue text-blue dark:text-blue dark:border-blue rounded-3xl duration-400 xl:scale-[0.85]'
          >
            <FireIcon className='h-10 stroke-2' />
            <div className='flex items-center text-4xl font-bold text-black dark:text-white gap-x-1 mt-7 font-primaryFont'>
              Nike
            </div>
            <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>Project of<br /> the last month.</span>
          </article>
        </Masonry>
      </section> */}
    </>
  )
}
