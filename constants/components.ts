import type FeaturesInterface from 'interfaces/home/Features'

export const PAGES = [
  { name: 'Tasks', link: '/tasks', admin: false },
  { name: 'Projects', link: '/projects', admin: false },
  { name: 'Profile', link: '/profile', admin: false },
  { name: 'Users', link: '/users', admin: true }
]

export const SKELETON = Array.from(Array(8).keys())

export const MASONRY_BREAKPOINTS = {
  default: 4,
  1536: 3,
  768: 2
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

export const LENIS_OPTIONS = {
  duration: 1.2
}
