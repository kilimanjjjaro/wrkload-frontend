import Stats from 'app/components/shared/Stats'
import Options from 'app/(dashboard)/users/components/Options'
import PageTitle from 'app/(dashboard)/users/components/PageTitle'
import Pagination from 'app/components/shared/Pagination'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout ({ children }: Props): JSX.Element {
  return (
    <>
      <header className='container flex justify-between px-6 mx-auto md:px-8 pt-7 md:pt-16 dark:text-white'>
        <PageTitle />
        <Options />
      </header>
      <main className='container px-6 pb-24 mx-auto md:px-8 md:pb-28'>
        {children}
        <Pagination />
        <Stats />
      </main>
    </>
  )
}
