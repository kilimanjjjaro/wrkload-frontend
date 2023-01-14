import { Inter, Space_Grotesk } from '@next/font/google'

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin']
})

const spaceGrotesk = Space_Grotesk({
  variable: '--space-grotesk-font',
  subsets: ['latin']
})

const fonts = { inter, spaceGrotesk }

export default fonts
