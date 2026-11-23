import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Users - wrkload', '/users')

export default function UsersLayout ({ children }: ChildrenInterface): JSX.Element {
  return <>{children}</>
}
