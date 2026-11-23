import { Suspense } from 'react'
import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Projects - wrkload', '/projects')

export default function ProjectsLayout ({ children }: ChildrenInterface): React.JSX.Element {
  return <Suspense>{children}</Suspense>
}
