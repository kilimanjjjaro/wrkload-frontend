import HeroHeader from 'components/home/HeroHeader'
import Features from 'components/home/Features'
import IntroducingStats from 'components/home/IntroducingStats'

export default function Home (): JSX.Element {
  return (
    <>
      <HeroHeader />
      <Features />
      <IntroducingStats />
    </>
  )
}
