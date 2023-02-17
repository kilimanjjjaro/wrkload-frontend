import { motion } from 'framer-motion'

const transition = {
  type: 'spring',
  stiffness: 200,
  damping: 10
}

export const MoonIcon = (): JSX.Element => {
  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, transition },
    whileTap: { scale: 0.95, rotate: 15 }
  }

  return (
    <motion.svg
      className='outline-0 [&>*]:outline-0'
      xmlns='http://www.w3.org/2000/svg'
      width='18px'
      height='18px'
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
    >
      <motion.path
        fill-rule='evenodd'
        d='M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z'
        clip-rule='evenodd'
        fill='currentColor'
        initial='initial'
        animate='animate'
        whileTap='whileTap'
        variants={variants}
      />
    </motion.svg>
  )
}

export const SunIcon = (): JSX.Element => {
  const whileTap = { scale: 0.95, rotate: 15 }

  const raysVariants = {
    initial: { rotate: 45 },
    animate: { rotate: 0, transition }
  }

  const coreVariants = {
    initial: { scale: 1.5 },
    animate: { scale: 1, transition }
  }

  return (
    <motion.svg
      className='origin-center outline-0 [&>*]:outline-0'
      key='sun'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      whileTap={whileTap}
    >
      <motion.circle
        cx='11.9998'
        cy='11.9998'
        r='5.75375'
        fill='currentColor'
        initial='initial'
        animate='animate'
        variants={coreVariants}
      />
      <motion.g initial='initial' animate='animate' variants={raysVariants}>
        <circle
          cx='3.08982'
          cy='6.85502'
          r='1.71143'
          transform='rotate(-60 3.08982 6.85502)'
          fill='currentColor'
        />
        <circle
          cx='3.0903'
          cy='17.1436'
          r='1.71143'
          transform='rotate(-120 3.0903 17.1436)'
          fill='currentColor'
        />
        <circle cx='12' cy='22.2881' r='1.71143' fill='currentColor' />
        <circle
          cx='20.9101'
          cy='17.1436'
          r='1.71143'
          transform='rotate(-60 20.9101 17.1436)'
          fill='currentColor'
        />
        <circle
          cx='20.9101'
          cy='6.8555'
          r='1.71143'
          transform='rotate(-120 20.9101 6.8555)'
          fill='currentColor'
        />
        <circle cx='12' cy='1.71143' r='1.71143' fill='currentColor' />
      </motion.g>
    </motion.svg>
  )
}

// Credits of animations to: https://medium.com/next-generation-web/create-a-dark-mode-toggle-micro-interaction-like-a-pro-279305e9c2
