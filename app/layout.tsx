'use client'

import { AnimatePresence, motion } from 'framer-motion'
import fonts from 'utils/fonts'
import AppProvider from 'contexts/AppContext'
import NavBar from 'components/shared/NavBar'
import Footer from 'components/shared/Footer'
import type { ChildrenInterface } from 'interfaces/components'
import 'app/globals.css'

export default function RootLayout ({ children }: ChildrenInterface): JSX.Element {
  const { inter, spaceGrotesk } = fonts

  return (
    <html lang='en' className='scroll-smooth dark'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link href='/favicon.png' rel='shortcut icon' />
        <meta property='og:description' content="wrkload is a web app where you can track what you've worked on in a simple and organized way." />
        <meta property='og:site_name' content='wrkload' />
        <meta property='og:locale' content='en-US' />
        <meta property='og:image:url' content='https://wrkload.vercel.app/images/og.jpg' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='650' />
        <meta property='og:type' content='website' />
      </head>
      <body className={`bg-white dark:bg-black transition-colors duration-400 ease-in-out antialiased ${inter.variable} ${spaceGrotesk.variable}`}>
        <AppProvider>
          <NavBar />
          <AnimatePresence>
            <motion.div
              initial={{ overflow: 'hidden' }}
              animate={{ overflow: 'visible' }}
              transition={{ delay: 2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}
