'use client'

import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import Atropos from 'atropos/react'
import { ArrowRightIcon, ArrowUpIcon, ClockIcon, FireIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import Masonry from 'react-masonry-css'
import Headline from 'components/shared/Headline'
import Paragraph from 'components/shared/Paragraph'
import Button from 'components/shared/Button'
import 'atropos/css'

export default function IntroducingStats (): JSX.Element {
  const router = useRouter()

  return (
    <header className='grid items-center gap-10 mb-20 mt-44 md:mt-0 md:mb-0 md:min-h-screen md:grid-cols-2'>
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
              <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>tasks uploaded<br /> in the current month.</span>
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
          <span className='mt-1 text-2xl text-black dark:text-white font-secondaryFont'>Project of<br /> the past month.</span>
        </article>
      </Masonry>
    </header>
  )
}
