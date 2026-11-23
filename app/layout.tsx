import { Analytics } from '@vercel/analytics/react'
import { inter, spaceGrotesk } from 'utils/fonts'
import Providers from 'app/providers'
import { DESCRIPTION, pageMetadata } from 'constants/metadata'
import type { ChildrenInterface } from 'interfaces/components'
import 'atropos/css'
import 'app/globals.css'

export const metadata = {
  ...pageMetadata('wrkload', '/'),
  description: DESCRIPTION,
  viewport: 'width=device-width, initial-scale=1',
  icons: { shortcut: '/favicon.png' }
}

export default function RootLayout ({ children }: ChildrenInterface): React.JSX.Element {
  return (
    <html lang='en' className='dark'>
      <body className={`bg-white dark:bg-black transition-colors duration-400 ease-in-out antialiased ${inter} ${spaceGrotesk}`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
