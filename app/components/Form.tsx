import Input from 'app/components/shared/Input'
import Textarea from 'app/components/shared/Textarea'
import Button from './shared/Button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Form (): JSX.Element {
  return (
    <form>
      <div className='grid gap-6 mb-6 md:mb-5 md:gap-10 md:grid-cols-2'>
        <Input type='text' placeholder='Can ask your name?' autoComplete='name' />
        <Input type='email' placeholder='I need you email too' autoComplete='email' />
      </div>
      <Textarea placeholder="What do you want to talk about? Maybe you have an idea or found something that doesn't work as expected." />
      <Button variant='primary'>Send <ArrowRightIcon className='w-4 stroke-width-3' /></Button>
    </form>
  )
}
