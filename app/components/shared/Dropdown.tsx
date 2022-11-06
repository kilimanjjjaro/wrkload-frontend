'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Dropdown () {
  const [dropdownStatus, setDropdownStatus] = useState(false)

  return (
    <div className='relative'>
      <button className='flex items-center gap-1 text-white transition duration-500 ease-in-out hover:text-primary font-secondaryFont' onClick={() => setDropdownStatus(!dropdownStatus)}>En<ChevronDownIcon className='w-3 stroke-width-3' /></button>
      {dropdownStatus &&
        <ul className='absolute mt-3 text-white top-full'>
          <button className='text-white transition duration-500 ease-in-out hover:text-primary'>Es</button>
          <button className='text-white transition duration-500 ease-in-out hover:text-primary'>En</button>
        </ul>}
    </div>
  )
}
