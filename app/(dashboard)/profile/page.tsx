import Headline from 'components/shared/Headline'
import PageTransition from 'components/shared/PageTransition'

export default function Profile (): JSX.Element {
  return (
    <PageTransition>
      <Headline className='font-bold text-blue' variant='lg'>
        Profile
      </Headline>
    </PageTransition>
  )
}
