import GlobalStats from 'app/components/shared/GlobalStats'
import Pagination from 'app/components/shared/Pagination'
import Header from 'app/components/shared/Header'
import Footer from 'app/components/shared/Footer'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout ({ children }: Props): JSX.Element {
  return (
    <div className='pt-40 bg-light-gray dark:bg-black'>
      <Header />
      <main className='container px-6 md:px-8'>
        {children}
        <Pagination />
        {/* @ts-expect-error Server Component */}
        <GlobalStats />
      </main>
      <Footer variant='secondary' />
    </div>
  )
}
