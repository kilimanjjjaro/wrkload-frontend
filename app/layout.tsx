import React from 'react'
import NavBar from './components/NavBar'
import './globals.css'

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='antialiased'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link href='https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' rel='stylesheet' />
      </head>
      <body className='bg-white dark:bg-black'>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
