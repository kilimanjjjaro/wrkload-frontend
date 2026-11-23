import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Tasks - wrkload', '/tasks')

export default function TasksLayout ({ children }: ChildrenInterface): JSX.Element {
  return <>{children}</>
}
