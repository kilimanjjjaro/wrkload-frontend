'use client'

import DataProvider from 'context/DataContext'
import Footer from 'app/components/shared/Footer'

interface Props {
  children: React.ReactNode
}

export default function AuthLayout ({ children }: Props): JSX.Element {
  return (
    <div className='bg-white dark:bg-black'>
      <main className='flex items-center justify-center mb-[120px] h-[calc(100vh-240px-84px)]'>
        <DataProvider>{children}</DataProvider>
      </main>
      <Footer variant='secondary' />
    </div>
  )
}
