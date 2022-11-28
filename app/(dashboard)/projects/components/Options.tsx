import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'

export default function Options (): JSX.Element {
  return (
    <div className='hidden lg:flex gap-x-5'>
      <Button variant='primary'><PlusIcon className='w-4 stroke-width-3' /></Button>
      <Button variant='primary'><MagnifyingGlassIcon className='w-4 stroke-width-3' /></Button>
    </div>
  )
}
