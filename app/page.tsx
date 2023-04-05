import PageTransition from 'components/shared/PageTransition'
import IntroducingTasks from 'components/home/IntroducingTasks'
import IntroducingStats from 'components/home/IntroducingStats'

export default function Home (): JSX.Element {
  return (
    <PageTransition>
      <main className='px-6 md:px-8 2xl:px-[5vw] mt-44 md:mt-0 mb-20 md:mb-0 overflow-hidden'>
        <IntroducingTasks />
        <IntroducingStats />
      </main>
    </PageTransition>
  )
}
