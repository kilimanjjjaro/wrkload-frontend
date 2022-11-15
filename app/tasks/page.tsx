import Pagination from 'app/components/shared/Pagination'
import Stats from 'app/components/shared/Stats'
import ListOfTasks from 'app/tasks/components/ListOfTasks'
import Options from 'app/tasks/components/Options'
import PageTitle from 'app/tasks/components/PageTitle'

export default function Tasks (): JSX.Element {
  return (
    <>
      <header className='container flex justify-between px-6 mx-auto md:px-8 pt-7 md:pt-16 dark:text-white'>
        <PageTitle />
        <Options />
      </header>
      <main className='container px-6 pb-24 mx-auto md:px-8 md:pb-28'>
        <ListOfTasks />
        <Pagination />
        <Stats />
      </main>
    </>
  )
}
