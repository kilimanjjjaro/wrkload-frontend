import HeroHeader from 'components/home/HeroHeader'
import Features from 'components/home/Features'
import IntroducingStats from 'components/home/IntroducingStats'
import IntroducingDarkMode from 'components/home/IntroducingDarkMode'

export default function Home (): JSX.Element {
  return (
    <>
      <HeroHeader />
      <Features />
      <IntroducingStats />
      <IntroducingDarkMode />
    </>
  )
}
