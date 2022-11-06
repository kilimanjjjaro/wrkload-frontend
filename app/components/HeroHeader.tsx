import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from './shared/Headline'
import Paragraph from './shared/Paragraph'
import Button from './shared/Button'

export default function HeroHeader () {
  return (
    <div className='container flex flex-col items-center justify-center pt-16 pb-8 mx-auto text-center text-white md:pt-20 md:pb-24'>
      <Headline type='h2'>Work,<br /> load your time<br /> and go have fun!</Headline>
      <div className='mb-8'>
        <Paragraph type='normal'><strong className='font-extrabold'>Easy-peasy!</strong><br /> With wrkload you can track what you work on in a simple and organized way.</Paragraph>
      </div>
      <Button type='primary'>Start now for free <ArrowRightIcon className='w-4 stroke-width-3' /></Button>
    </div>
  )
}
