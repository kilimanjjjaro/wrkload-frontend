import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Paragraph from 'app/components/shared/Paragraph'
import Button from 'app/components/shared/Button'

export default function HeroHeader (): JSX.Element {
  return (
    <div className='container flex flex-col items-center justify-center pt-16 pb-8 mx-auto text-center text-black dark:text-white md:pt-16 md:pb-12 2xl:pt-20 2xl:pb-24'>
      <Headline type='h2'>Work,<br /> load your time<br /> and go have fun!</Headline>
      <div className='md:w-[62%] xl:w-[36%] 2xl:w-[30%] mb-8'>
        <Paragraph type='normal'><b className='font-extrabold'>Easy-peasy!</b><br /> With wrkload you can track what you work on in a simple and organized way.</Paragraph>
      </div>
      <Button type='primary' link='/'>Start now for free <ArrowRightIcon className='w-4 stroke-width-3' /></Button>
    </div>
  )
}
