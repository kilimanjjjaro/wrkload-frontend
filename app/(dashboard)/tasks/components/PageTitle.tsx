'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'

export const PageTitle = (): JSX.Element => {
  const [project] = useState('Powgen')

  return (
    <Headline variant='lg'>Tasks of <button className='inline-flex items-center transition ease-in-out duration-400 gap-x-1 2xl:gap-x-3 hover:text-dark-gray'><b>{project}</b> <ChevronDownIcon className='w-4md:w-6 2xl:w-8 stroke-width-3-5' /></button></Headline>
  )
}
