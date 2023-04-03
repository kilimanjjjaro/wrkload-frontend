import { Inter, Space_Grotesk } from 'next/font/google'

const interFont = Inter({
  variable: '--inter-font',
  subsets: ['latin']
})

const spaceGroteskFont = Space_Grotesk({
  variable: '--space-grotesk-font',
  subsets: ['latin']
})

export const inter = interFont.variable
export const spaceGrotesk = spaceGroteskFont.variable
