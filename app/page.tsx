import HeroHeader from 'components/home/HeroHeader'
import PageTransition from 'components/shared/PageTransition'

export default function Home (): JSX.Element {
  return (
    <PageTransition>
      <main className='px-6 md:px-8 2xl:px-[5vw] mt-44 md:mt-0'>
        <HeroHeader />
      </main>
    </PageTransition>
  )
}
