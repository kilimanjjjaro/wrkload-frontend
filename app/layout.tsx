import fonts from 'utils/fonts'
import DataProvider from 'context/DataContext'
import NavBar from 'app/components/shared/NavBar'
import Footer from 'app/components/shared/Footer'
import 'app/globals.css'

import type { ChildrenInterface } from 'interfaces/components'

export default function RootLayout ({ children }: ChildrenInterface): JSX.Element {
  const { inter, spaceGrotesk } = fonts

  return (
    <html lang='en' className='scroll-smooth '>
      <head />
      <body className={`bg-light-gray dark:bg-alternative antialiased ${inter.variable} ${spaceGrotesk.variable}`}>
        <DataProvider>
          <NavBar />
          {children}
          <Footer />
        </DataProvider>
      </body>
    </html>
  )
}
