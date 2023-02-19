'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LanguageIcon } from '@heroicons/react/24/solid'

const VARIANTS = {
  open: { opacity: 1, x: -62, display: 'flex' },
  closed: {
    opacity: 0,
    x: -50,
    transitionEnd: {
      display: 'none'
    }
  }
}

const LANGUAGES = [
  { name: 'En', code: 'en' },
  { name: 'Es', code: 'es' }
]

export default function Languages (): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className='relative'>
      <button className='flex items-center gap-1 transition ease-in-out duration-400 font-secondaryFont' onClick={() => setShowDropdown(!showDropdown)}><LanguageIcon className='w-[18px] transition ease-in-out duration-400 hover:text-white' /></button>
      <motion.ul
        className='absolute top-0 flex gap-3 text-sm font-secondaryFont' animate={showDropdown ? 'open' : 'closed'}
        variants={VARIANTS}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        initial={false}
      >
        {LANGUAGES.map((language) => <button key={language.code} className='transition ease-in-out duration-400 hover:text-white'>{language.name}</button>)}
      </motion.ul>
    </div>
  )
}
