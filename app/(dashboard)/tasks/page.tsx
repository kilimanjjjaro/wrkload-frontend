import ListOfTasks from 'app/(dashboard)/tasks/components/ListOfTasks'

export default function Tasks (): JSX.Element {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <ListOfTasks />
    </>
  )
}
