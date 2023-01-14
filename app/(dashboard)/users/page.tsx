import Card from 'app/components/shared/Card'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import UpdateUser from 'app/(dashboard)/users/components/UpdateUser'
import { UserInterface } from 'interfaces/users/User'

const USERS = [
  { _id: 1, username: 'kilimanjjjaro', email: 'hola@kilimanjjjaro.com', role: 1, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: true },
  { _id: 1, username: 'rivotril', email: 'hola@kilimanjjjaro.com', role: 2, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: false },
  { _id: 1, username: 'AG5', email: 'hola@kilimanjjjaro.com', role: 3, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: false },
  { _id: 1, username: 'kediev', email: 'hola@kilimanjjjaro.com', role: 1, avatar: '/images/default-avatar.svg', registeredAt: '10/12/1992', lastActiveAt: '10/12/1992', confirmationStatus: true }
]

export default function Users (): JSX.Element {
  console.log(USERS)
  return (
    <MasonryGrid>
      {USERS?.map((user: UserInterface) => (
        <Card key={user._id} data={user} updateData={UpdateUser} />
      ))}
    </MasonryGrid>
  )
}
