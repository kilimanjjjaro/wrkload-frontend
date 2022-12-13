import { AppContextProvider } from 'context'
import { inter, syne } from 'utils/fonts'
import NavBar from 'app/components/shared/NavBar'
import './globals.css'

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en' className='scroll-smooth dark'>
      <head />
      <body className={`bg-black antialiased ${inter.variable} ${syne.variable}`}>
        <AppContextProvider>
          <NavBar />
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}
