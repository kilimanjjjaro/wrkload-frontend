'use client'

import fonts from 'utils/fonts'
import DataProvider from 'contexts/DataContext'
import NavBar from 'components/shared/NavBar'
import Footer from 'components/shared/Footer'
import type { Metadata } from 'next'
import 'app/globals.css'

import type { ChildrenInterface } from 'interfaces/components'
import { AnimatePresence } from 'framer-motion'

export const metadata: Metadata = {
  title: { default: 'wrkload', template: '%s | wrkload' },
  openGraph: {
    siteName: 'wrkload',
    authors: 'Kilimanjjjaro',
    locale: 'en-US'
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png'
  }
}

export default function RootLayout ({ children }: ChildrenInterface): JSX.Element {
  const { inter, spaceGrotesk } = fonts

  return (
    <html lang='en' className='scroll-smooth dark'>
      <body className={`bg-light-blue dark:bg-black transition-colors duration-400 ease-in-out antialiased overflow-hidden ${inter.variable} ${spaceGrotesk.variable}`}>
        <DataProvider>
          <NavBar />
          <AnimatePresence mode='wait'>
            {children}
          </AnimatePresence>
          <Footer />
        </DataProvider>
      </body>
    </html>
  )
}
