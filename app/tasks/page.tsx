import Pagination from 'app/components/shared/Pagination'
import Stats from 'app/components/shared/Stats'
import ListOfTasks from 'app/tasks/components/ListOfTasks'

export default function Tasks (): JSX.Element {
  return (
    <>
      <ListOfTasks />
      <Pagination />
      <Stats />
    </>
  )
}
