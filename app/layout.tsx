'use client'

import { SWRConfig } from 'swr'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import { ReactLenis } from '@studio-freight/react-lenis'
import { Analytics } from "@vercel/analytics/react"
import { inter, spaceGrotesk } from 'utils/fonts'
import AppProvider from 'contexts/AppContext'
import NavBar from 'components/shared/NavBar'
import Footer from 'components/shared/Footer'
import { LENIS_OPTIONS } from 'constants/components'
import type { ChildrenInterface } from 'interfaces/components'
import 'app/globals.css'

export default function RootLayout ({ children }: ChildrenInterface): JSX.Element {
  return (
    <html lang='en' className='dark'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content="wrkload is a web app where you can track what you've worked on in a simple and organized way." />
        <link href='/favicon.png' rel='shortcut icon' />
        <meta property='og:description' content="wrkload is a web app where you can track what you've worked on in a simple and organized way." />
        <meta property='og:site_name' content='wrkload' />
        <meta property='og:locale' content='en-US' />
        <meta property='og:image' content='https://wrkload.vercel.app/images/og.jpg' />
        <meta property='og:type' content='website' />
      </head>
      <body className={`bg-white dark:bg-black transition-colors duration-400 ease-in-out antialiased ${inter} ${spaceGrotesk}`}>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <AppProvider>
            <NavBar />
            <AnimatePresence>
              <ReactLenis root options={LENIS_OPTIONS}>
                {children}
              </ReactLenis>
            </AnimatePresence>
            <Toaster position='top-center' toastOptions={{ className: 'ui-notifications' }} duration={5000} />
            <Footer />
          </AppProvider>
        </SWRConfig>
        <Analytics />
      </body>
    </html>
  )
}
