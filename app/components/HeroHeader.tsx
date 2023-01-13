import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Paragraph from 'app/components/shared/Paragraph'
import Button from 'app/components/shared/Button'

export default function HeroHeader (): JSX.Element {
  return (
    <div className='container flex flex-col items-center text-gray-200 justify-center h-[calc(100svh-60px)] h-[calc(100vh-60px)] mx-auto text-center'>
      <Headline variant='2xl'>Work,<br /> load your time<br /> and go have fun!</Headline>
      <div className='md:w-[62%] xl:w-[36%] 2xl:w-[30%] mb-8'>
        <Paragraph variant='normal'><b className='font-extrabold'>Easy-peasy!</b><br /> With wrkload you can track what you work on in a simple and organized way.</Paragraph>
      </div>
      <Button variant='primary'>Start now for free <ArrowRightIcon className='w-4 stroke-width-3' /></Button>
    </div>
  )
}
