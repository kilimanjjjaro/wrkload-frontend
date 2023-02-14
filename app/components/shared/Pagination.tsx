import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import type { PaginationInterface } from 'interfaces/components'

export default function Pagination ({ data }: { data: PaginationInterface }): JSX.Element {
  return (
    <div className='flex justify-center mt-10 gap-x-5'>
      <Button variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /></Button>
      <div className='self-center text-sm text-white dark:text-white font-secondaryFont'>Page {data.page}</div>
      <Button variant='primary'><ArrowRightIcon className='w-4 stroke-3' /></Button>
    </div>
  )
}
