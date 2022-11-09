import React from 'react'
import NavBar from './components/shared/NavBar'
import Footer from './components/Footer'
import { inter, syne } from './utils/fonts'

import './globals.css'

interface Props {
  children: React.ReactNode
}

export default function RootLayout ({ children }: Props): JSX.Element {
  return (
    <html lang='en' className='dark scroll-smooth'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className={`bg-gray-100 dark:bg-alternative ${inter.variable} ${syne.variable} antialiased`}>
        <div className='bg-white dark:bg-black rounded-b-[32px]'>
          <NavBar />
          {children}
        </div>
        <footer className='container px-6 pt-16 pb-8 mx-auto md:px-8'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
