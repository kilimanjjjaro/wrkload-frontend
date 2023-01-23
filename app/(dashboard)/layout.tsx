import GlobalStats from 'app/components/shared/stats/GlobalStats'
import Pagination from 'app/components/shared/Pagination'
import Header from 'app/components/shared/Header'

import type { ChildrenInterface } from 'interfaces/components'

export default function DashboardLayout ({ children }: ChildrenInterface): JSX.Element {
  return (
    <div className='px-[5vw] py-40 pb-36 bg-light-gray'>
      <Header />
      <main>
        {children}
        <Pagination />
        <GlobalStats />
      </main>
    </div>
  )
}
