import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from './shared/Headline'
import Paragraph from './shared/Paragraph'
import Button from './shared/Button'

export default function HeroHeader () {
  return (
    <div className='container mx-auto py-20 flex flex-col items-center justify-center text-white text-center'>
      <Headline type='h2'>Work,<br /> load your time<br /> and go have fun!</Headline>
      <Paragraph type='normal'><strong className='font-extrabold'>Easy-peasy!</strong><br /> With wrkload you can track what you work on<br /> in a simple and organized way.</Paragraph>
      <Button type='primary'>Start now for free <ArrowRightIcon className='w-4 stroke-width-3' /></Button>
    </div>
  )
}
