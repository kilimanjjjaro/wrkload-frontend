import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'

export const Options = (): JSX.Element => {
  return (
    <>
      <div className='hidden lg:flex gap-x-5'>
        <Button variant='primary'><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
      </div>
    </>
  )
}
