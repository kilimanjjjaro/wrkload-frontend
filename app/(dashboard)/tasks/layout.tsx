import { Suspense } from 'react'
import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Tasks - wrkload', '/tasks')

export default function TasksLayout ({ children }: ChildrenInterface): React.JSX.Element {
  return <Suspense>{children}</Suspense>
}
