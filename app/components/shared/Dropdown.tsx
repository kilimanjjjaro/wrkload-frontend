'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Dropdown (): JSX.Element {
  const [dropdownStatus, setDropdownStatus] = useState(false)

  return (
    <div className='relative'>
      <button className='flex items-center gap-1 text-black transition duration-500 ease-in-out dark:text-white hover:text-primary dark:hover:text-primary font-secondaryFont' onClick={() => setDropdownStatus(!dropdownStatus)}>En<ChevronDownIcon className='w-3 stroke-width-3' /></button>
      {dropdownStatus &&
        <ul className='absolute mt-3 text-white top-full'>
          <button className='block text-black transition duration-500 ease-in-out dark:text-white hover:text-primary dark:hover:text-primary'>Es</button>
          <button className='block text-black transition duration-500 ease-in-out dark:text-white hover:text-primary dark:hover:text-primary'>En</button>
        </ul>}
    </div>
  )
}
