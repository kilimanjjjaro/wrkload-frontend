import { Inter, Syne } from '@next/font/google'

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin']
})

const syne = Syne({
  variable: '--syne-font',
  subsets: ['latin']
})

const fonts = { inter, syne }

export default fonts
