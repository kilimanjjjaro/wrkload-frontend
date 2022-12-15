import ListOfProjects from 'app/(dashboard)/projects/components/ListOfProjects'

export default function Projects (): JSX.Element {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <ListOfProjects />
    </>
  )
}
