'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Headline from 'app/components/shared/Headline'

export default function PageTitle (): JSX.Element {
  const [project, setProject] = useState('Powgen')

  return (
    <Headline type='h4'>Tasks of <button className='inline-flex items-center transition duration-500 ease-in-out gap-x-1 2xl:gap-x-3 hover:text-primary dark:hover:text-primary'><strong>{project}</strong> <ChevronDownIcon className='w-4 md:w-6 2xl:w-8 stroke-width-3-5' /></button></Headline>
  )
}
