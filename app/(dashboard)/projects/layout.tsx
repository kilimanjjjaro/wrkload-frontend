import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Projects - wrkload', '/projects')

export default function ProjectsLayout ({ children }: ChildrenInterface): JSX.Element {
  return <>{children}</>
}
