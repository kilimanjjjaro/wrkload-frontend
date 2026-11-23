'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { LanguageIcon } from '@heroicons/react/24/solid'
import { FULL_SCALE, HIDDEN_OPACITY, HIDDEN_SCALE, LANGUAGES_CLOSED_OFFSET_X, LANGUAGES_OPEN_OFFSET_X, SPRING_DAMPING, SPRING_STIFFNESS, TRANSITION_DURATION, VISIBLE_OPACITY } from 'constants/animation'

const VARIANTS = {
  open: { opacity: VISIBLE_OPACITY, x: LANGUAGES_OPEN_OFFSET_X, display: 'flex' },
  closed: {
    opacity: HIDDEN_OPACITY,
    x: LANGUAGES_CLOSED_OFFSET_X,
    transitionEnd: {
      display: 'none'
    }
  }
}

const LANGUAGES = [
  { name: 'En', code: 'en' },
  { name: 'Es', code: 'es' }
]

export default function Languages (): React.JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <motion.div
      className='relative will-change-transform'
      initial={{ scale: HIDDEN_SCALE }}
      animate={{ scale: FULL_SCALE }}
      transition={{
        type: 'spring',
        stiffness: SPRING_STIFFNESS,
        damping: SPRING_DAMPING
      }}
    >
      <button aria-label='Change language' className='flex items-center gap-1 transition ease-in-out duration-400 font-secondaryFont' onClick={() => { setShowDropdown(!showDropdown); }}><LanguageIcon className='w-[18px] transition ease-in-out duration-400 hover:text-blue dark:hover:text-white' /></button>
      <motion.ul
        className='absolute top-0 flex items-center gap-3 text-sm font-secondaryFont group' animate={showDropdown ? 'open' : 'closed'}
        initial={false}
        transition={{ ease: 'easeInOut', duration: TRANSITION_DURATION }}
        variants={VARIANTS}
      >
        {LANGUAGES.map((language) => <button key={language.code} className='transition ease-in-out duration-400 hover:text-blue dark:hover:text-white'>{language.name}</button>)}
        <div className='absolute invisible opacity-100 md:opacity-0 tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out left-[-6.3rem] bg-white dark:bg-light-blue text-black duration-400 group-hover:opacity-100 group-hover:visible rounded-full'>
          Coming soon
        </div>
      </motion.ul>
    </motion.div>
  )
}
