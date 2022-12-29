import fonts from 'utils/fonts'
import NavBar from 'app/components/shared/NavBar'
import 'app/globals.css'
import DataProvider from 'context/DataContext'

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  const { inter, syne } = fonts

  return (
    <html lang='en' className='scroll-smooth dark'>
      <head />
      <body className={`bg-black antialiased ${inter.variable} ${syne.variable}`}>
        <DataProvider>
          <NavBar />
          {children}
        </DataProvider>
      </body>
    </html>
  )
}
