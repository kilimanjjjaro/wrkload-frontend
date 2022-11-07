import { ArrowRightIcon } from '@heroicons/react/24/outline'

import Button from './shared/Button'

export default function Form () {
  return (
    <form>
      <div className='grid gap-6 mb-6 md:mb-5 md:gap-10 md:grid-cols-2'>
        <input className='w-full h-10 px-5 text-sm leading-tight text-black placeholder-black placeholder-opacity-100 bg-gray-100 rounded-full appearance-none md:text-baseblock font-secondaryFont dark:bg-alternative dark:text-white focus:outline-none dark:placeholder-white' type='text' placeholder='Can ask your name?' autoComplete='name' />
        <input className='w-full h-10 px-5 text-sm leading-tight text-black placeholder-black placeholder-opacity-100 bg-gray-100 rounded-full appearance-none md:text-baseblock font-secondaryFont dark:bg-alternative dark:text-white focus:outline-none dark:placeholder-white' type='text' placeholder='I need you email too' autoComplete='name' />
      </div>
      <textarea className='w-full p-5 mb-6 text-sm leading-tight text-black placeholder-black placeholder-opacity-100 bg-gray-100 appearance-none resize-none md:mb-5 md:text-baseblock h-36 rounded-3xl font-secondaryFont dark:bg-alternative dark:text-white focus:outline-none dark:placeholder-white' placeholder="What do you want to talk about? Maybe you have an idea or found something that doesn't work as expected." />
      <Button type='primary'>Send <ArrowRightIcon className='w-4 stroke-width-3' /></Button>
    </form>
  )
}
