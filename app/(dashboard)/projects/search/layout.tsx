import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Search projects - wrkload')

export default function SearchLayout({
  children
}: ChildrenInterface): React.JSX.Element {
  return <>{children}</>
}
