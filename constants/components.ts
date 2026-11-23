import type FeaturesInterface from 'interfaces/home/Features'

export const PAGES = [
  { name: 'Tasks', link: '/tasks', admin: false },
  { name: 'Projects', link: '/projects', admin: false },
  { name: 'Profile', link: '/profile', admin: false },
  { name: 'Users', link: '/users', admin: true }
]

const SKELETON_ITEMS = 8
export const SKELETON = Array.from(Array(SKELETON_ITEMS).keys())

const MASONRY_DEFAULT_COLUMNS = 4
const XXL_BREAKPOINT_PX = 1536
const XXL_COLUMNS = 3
const MD_BREAKPOINT_PX = 768
const MD_COLUMNS = 2
export const MASONRY_BREAKPOINTS = {
  default: MASONRY_DEFAULT_COLUMNS,
  [XXL_BREAKPOINT_PX]: XXL_COLUMNS,
  [MD_BREAKPOINT_PX]: MD_COLUMNS
}

export const FEATURES: FeaturesInterface[] = [
  {
    image: 'public/images/feature.jpg',
    title: 'Without chaos at payday!',
    description:
      'wrkload was developed to help people who get paid by goals to keep track of -easily and clearly- what they have worked on in the month.'
  },
  {
    image: 'public/images/feature.jpg',
    title: 'All you need in one blink!',
    description:
      'You can control in detail the time you worked on a task and extra data associated with it. All in the same place.'
  },
  {
    image: 'public/images/feature.jpg',
    title: 'Mo control Mo safety!',
    description:
      'You can have real-time access to what you are earning per project at month and check what you earned at last months.'
  },
  {
    image: 'public/images/feature.jpg',
    title: 'Fast and safe!',
    description:
      'Just upload your tasks and go have fun because only you have access to them.'
  }
]

export const CHARACTER_LIMIT = 200

export const STATS_AUTOPLAY_DELAY_MS = 4000

const LENIS_DURATION = 1.2
export const LENIS_OPTIONS = {
  duration: LENIS_DURATION
}

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp'
]
const MAX_IMAGE_SIZE_MB = 5
const BYTES_PER_KILOBYTE = 1024
const KILOBYTES_PER_MEGABYTE = 1024
export const ALLOWED_IMAGE_SIZE =
  MAX_IMAGE_SIZE_MB * KILOBYTES_PER_MEGABYTE * BYTES_PER_KILOBYTE

export const SERVER_RESPONSE_STATUS = {
  OK: 'ok',
  ERROR: 'error'
}
