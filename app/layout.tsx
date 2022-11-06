import React from 'react'
import NavBar from './components/shared/NavBar'
import { inter, syne } from './utils/fonts'
import HeroHeader from './components/HeroHeader'
import Footer from './components/Footer'

import './globals.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className={`bg-white dark:bg-alternative ${inter.variable} ${syne.variable} antialiased`}>
        <div className='bg-white dark:bg-black rounded-b-[32px]'>
          <header className='container px-6 mx-auto md:px-8'>
            <NavBar />
            <HeroHeader />
          </header>
          <main className='container px-6 py-24 mx-auto md:px-8 md:py-28'>
            {children}
          </main>
        </div>
        <footer className='container px-6 pt-16 pb-8 mx-auto md:px-8'>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
