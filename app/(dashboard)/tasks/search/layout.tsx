import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Search tasks - wrkload')

export default function SearchLayout ({ children }: ChildrenInterface): JSX.Element {
  return <>{children}</>
}
