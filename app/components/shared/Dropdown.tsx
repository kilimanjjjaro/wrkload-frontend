'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Dropdown () {
  const [dropdownStatus, setDropdownStatus] = useState(false)

  return (
    <div className='relative'>
      <button className='flex gap-1 items-center text-white hover:text-primary transition ease-in-out duration-500' onClick={() => setDropdownStatus(!dropdownStatus)}>En<ChevronDownIcon className='w-3 stroke-width-3' /></button>
      {dropdownStatus &&
        <ul className='absolute top-full mt-3 text-white'>
          <button className='text-white hover:text-primary transition ease-in-out duration-500'>Es</button>
          <button className='text-white hover:text-primary transition ease-in-out duration-500'>En</button>
        </ul>}
    </div>
  )
}
