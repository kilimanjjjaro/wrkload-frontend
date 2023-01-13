import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const VARIANTS = {
  open: { opacity: 1, y: 0, display: 'block' },
  closed: {
    opacity: 0,
    y: 20,
    transitionEnd: {
      display: 'none'
    }
  }
}

const LANGUAGES = [
  { name: 'En', code: 'en' },
  { name: 'Es', code: 'es' }
]

export default function Dropdown (): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className='relative'>
      <button className='flex items-center gap-1 text-gray-200 transition ease-in-out duration-400 hover:text-white hover:drop-shadow-xl dark:hover:text-primary font-secondaryFont' onClick={() => setShowDropdown(!showDropdown)}>En<ChevronDownIcon className='w-3 stroke-width-3' /></button>
      <motion.ul
        className='absolute mt-3 text-white top-full font-secondaryFont' animate={showDropdown ? 'open' : 'closed'}
        variants={VARIANTS}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        initial={false}
      >
        {LANGUAGES.map((language) => <button key={language.code} className='block text-gray-200 transition ease-in-out duration-400 dark:text-white hover:text-white hover:drop-shadow-xl dark:hover:text-primary'>{language.name}</button>)}
      </motion.ul>
    </div>
  )
}
