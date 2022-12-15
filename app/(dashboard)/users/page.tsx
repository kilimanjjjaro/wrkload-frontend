import ListOfUsers from 'app/(dashboard)/users/components/ListOfUsers'

export default function Users (): JSX.Element {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <ListOfUsers />
    </>
  )
}
