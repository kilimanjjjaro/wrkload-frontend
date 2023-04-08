'use client'

import PageTransition from 'components/shared/PageTransition'
import IntroducingTasks from 'components/home/IntroducingTasks'
import IntroducingStats from 'components/home/IntroducingStats'

export default function Home (): JSX.Element {
  return (
    <PageTransition>
      <div className='px-6 md:px-8 2xl:px-[5vw]'>
        <IntroducingTasks />
        <IntroducingStats />
      </div>
    </PageTransition>
  )
}
