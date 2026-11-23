import { Inter, Space_Grotesk } from 'next/font/google'

const interFont = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
  preload: true
})

const spaceGroteskFont = Space_Grotesk({
  variable: '--space-grotesk-font',
  subsets: ['latin'],
  preload: true
})

export const { variable: inter } = interFont
export const { variable: spaceGrotesk } = spaceGroteskFont
