import Pagination from 'app/components/shared/Pagination'
import Stats from 'app/components/shared/Stats'
import ListOfProjects from 'app/projects/components/ListOfProjects'
import Options from 'app/projects/components/Options'
import PageTitle from 'app/projects/components/PageTitle'

export default function Projects (): JSX.Element {
  return (
    <>
      <header className='container flex justify-between px-6 mx-auto md:px-8 pt-7 md:pt-16 dark:text-white'>
        <PageTitle />
        <Options />
      </header>
      <main className='container px-6 pb-24 mx-auto md:px-8 md:pb-28'>
        <ListOfProjects />
        <Pagination />
        <Stats />
      </main>
    </>
  )
}
