import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Profile - wrkload', '/profile')

export default function ProfileLayout ({ children }: ChildrenInterface): React.JSX.Element {
  return <>{children}</>
}
