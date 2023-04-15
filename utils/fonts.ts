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

export const inter = interFont.variable
export const spaceGrotesk = spaceGroteskFont.variable
