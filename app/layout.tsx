import { inter, syne } from 'utils/fonts'
import NavBar from 'app/components/shared/NavBar'
import './globals.css'

interface Props {
  children: React.ReactNode
}

export default function RootLayout ({ children }: Props): JSX.Element {
  return (
    <html lang='en' className='scroll-smooth dark'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className={`antialiased ${inter.variable} ${syne.variable}`}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
