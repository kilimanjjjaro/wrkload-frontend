export const BACKGROUND_VARIANTS = {
  open: { opacity: 1, display: 'flex' },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none'
    }
  }
}

export const CONTENT_VARIANTS = {
  initial: { opacity: 0, y: 100, display: 'none' },
  open: { opacity: 1, y: 0, display: 'block', transition: { delay: 0.2 } },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none'
    }
  }
}

export const PAGE_VARIANTS = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
}
