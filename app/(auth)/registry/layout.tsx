import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Registry - wrkload', '/registry')

export default function RegistryLayout ({ children }: ChildrenInterface): JSX.Element {
  return <>{children}</>
}
