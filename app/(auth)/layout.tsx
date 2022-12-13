import Footer from 'app/components/shared/Footer'

interface Props {
  children: React.ReactNode
}

export default function AuthLayout ({ children }: Props): JSX.Element {
  return (
    <div className='bg-white dark:bg-black'>
      <main className='flex items-center justify-center h-[calc(100vh-84px)]'>
        {children}
      </main>
      <Footer variant='secondary' />
    </div>
  )
}
