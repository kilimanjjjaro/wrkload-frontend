import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'
import Paragraph from 'app/components/shared/Paragraph'
import Button from 'app/components/shared/Button'

interface Props {
  title: string
  description: string
}

export default function Feedback ({ title, description }: Props): JSX.Element {
  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-80 min-w-auto '>
        <Headline variant='md'><b>{title}</b></Headline>
        <Paragraph variant='sm'>{description}</Paragraph>
        <Button variant='secondary'>
          <ArrowLeftIcon className='w-4 stroke-3' />
        </Button>
      </div>
    </div>
  )
}
