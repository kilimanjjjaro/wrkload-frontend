import GlobalStats from 'app/components/shared/stats/GlobalStats'
import Pagination from 'app/components/shared/Pagination'
import Header from 'app/components/shared/Header'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout ({ children }: Props): JSX.Element {
  return (
    <div className='px-[5vw] py-40 pb-36 bg-light-gray'>
      <Header />
      <main>
        {children}
        <Pagination />
        {/* @ts-expect-error Server Component */}
        <GlobalStats />
      </main>
    </div>
  )
}
