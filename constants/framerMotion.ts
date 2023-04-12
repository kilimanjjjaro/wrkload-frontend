export const BACKGROUND_VARIANTS = {
  open: { opacity: 1, display: 'flex' },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none'
    }
  }
} as const

export const CONTENT_VARIANTS = {
  initial: { opacity: 0, y: 100, display: 'none' },
  open: { opacity: 1, y: 0, display: 'block', transition: { delay: 0.2 } },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none'
    }
  }
} as const

export const PAGE_VARIANTS = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
      delay: 1.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
} as const
