'use client'

import { SWRConfig } from 'swr'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import { ReactLenis } from '@studio-freight/react-lenis'
import AppProvider from 'contexts/AppContext'
import NavBar from 'components/shared/NavBar'
import Footer from 'components/shared/Footer'
import { LENIS_OPTIONS } from 'constants/components'
import type { ChildrenInterface } from 'interfaces/components'

export default function Providers ({ children }: ChildrenInterface): JSX.Element {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <AppProvider>
        <NavBar />
        <AnimatePresence>
          <ReactLenis root options={LENIS_OPTIONS}>
            {children}
          </ReactLenis>
        </AnimatePresence>
        <Toaster position='top-center' toastOptions={{ className: 'ui-notifications' }} duration={5000} />
        <Footer />
      </AppProvider>
    </SWRConfig>
  )
}
