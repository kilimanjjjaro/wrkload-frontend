import { AppContextProvider } from 'context'
import { inter, syne } from 'utils/fonts'
import NavBar from 'app/components/shared/NavBar'
import { LayoutProps } from 'interfaces/components'
import './globals.css'

export default function RootLayout ({ children }: LayoutProps): JSX.Element {
  return (
    <html lang='en' className='scroll-smooth dark'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className={`antialiased ${inter.variable} ${syne.variable}`}>
        <AppContextProvider>
          <NavBar />
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}
