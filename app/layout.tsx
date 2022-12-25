import fonts from 'utils/fonts'
import NavBar from 'app/components/shared/NavBar'
import 'app/globals.css'
import UserProvider from 'context/UserContext'

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  const { inter, syne } = fonts

  return (
    <html lang='en' className='scroll-smooth dark'>
      <head />
      <body className={`bg-black antialiased ${inter.variable} ${syne.variable}`}>
        <UserProvider>
          <NavBar />
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
