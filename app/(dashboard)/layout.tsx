import GlobalStats from 'app/components/shared/GlobalStats'
import Pagination from 'app/components/shared/Pagination'
import Header from 'app/components/shared/Header'
import Footer from 'app/components/shared/Footer'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout ({ children }: Props): JSX.Element {
  return (
    <div className='bg-white dark:bg-black'>
      <Header />
      <main className='container px-6 mx-auto md:px-8'>
        {children}
        <Pagination />
        <GlobalStats />
      </main>
      <Footer variant='secondary' />
    </div>
  )
}
