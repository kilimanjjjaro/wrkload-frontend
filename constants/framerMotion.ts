import {
  HIDDEN_OPACITY,
  MODAL_CONTENT_OFFSET_Y,
  NO_OFFSET,
  PAGE_ENTER_DELAY,
  PAGE_FADE_DURATION,
  TRANSITION_DELAY,
  VISIBLE_OPACITY
} from 'constants/animation'

export const BACKGROUND_VARIANTS = {
  open: { opacity: VISIBLE_OPACITY, display: 'flex' },
  closed: {
    opacity: HIDDEN_OPACITY,
    transitionEnd: {
      display: 'none'
    }
  }
}

export const CONTENT_VARIANTS = {
  initial: {
    opacity: HIDDEN_OPACITY,
    y: MODAL_CONTENT_OFFSET_Y,
    display: 'none'
  },
  open: {
    opacity: VISIBLE_OPACITY,
    y: NO_OFFSET,
    display: 'block',
    transition: { delay: TRANSITION_DELAY }
  },
  closed: {
    opacity: HIDDEN_OPACITY,
    transitionEnd: {
      display: 'none'
    }
  }
}

export const PAGE_VARIANTS = {
  initial: {
    opacity: HIDDEN_OPACITY
  },
  animate: {
    opacity: VISIBLE_OPACITY,
    transition: {
      duration: PAGE_FADE_DURATION,
      ease: 'easeInOut',
      delay: PAGE_ENTER_DELAY
    }
  },
  exit: {
    opacity: HIDDEN_OPACITY,
    transition: {
      duration: PAGE_FADE_DURATION,
      ease: 'easeInOut'
    }
  }
}
