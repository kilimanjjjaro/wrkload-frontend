import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'

export default function Pagination (): JSX.Element {
  return (
    <div className='flex justify-center mt-10 gap-x-5'>
      <Button variant='primary'><ArrowLeftIcon className='w-4 stroke-width-3' /></Button>
      <div className='self-center text-sm text-black dark:text-white font-secondaryFont'>Page 1</div>
      <Button variant='primary'><ArrowRightIcon className='w-4 stroke-width-3' /></Button>
    </div>
  )
}
