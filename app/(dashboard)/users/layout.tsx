import { Suspense } from 'react'
import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Users - wrkload', '/users')

export default function UsersLayout({
  children
}: ChildrenInterface): React.JSX.Element {
  return <Suspense>{children}</Suspense>
}
