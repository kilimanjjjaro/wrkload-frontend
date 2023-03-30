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
    <motion.div
      className='relative will-change-transform'
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 10
      }}
    >
      <button className='flex items-center gap-1 transition ease-in-out duration-400 font-secondaryFont' onClick={() => setShowDropdown(!showDropdown)}><LanguageIcon className='w-[18px] transition ease-in-out duration-400 hover:text-white' /></button>
      <motion.ul
        className='absolute top-0 flex items-center gap-3 text-sm font-secondaryFont group' animate={showDropdown ? 'open' : 'closed'}
        initial={false}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        variants={VARIANTS}
      >
        {LANGUAGES.map((language) => <button key={language.code} className='transition ease-in-out duration-400 hover:text-white'>{language.name}</button>)}
        <div className='absolute invisible opacity-100 md:opacity-0 tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out -left-[6.3rem] bg-light-blue text-black duration-400 group-hover:opacity-100 group-hover:visible rounded-full'>
          Coming soon
        </div>
      </motion.ul>
    </motion.div>
  )
}
