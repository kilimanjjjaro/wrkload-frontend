import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Change password - wrkload', '/change-password')

export default function ChangePasswordLayout ({ children }: ChildrenInterface): React.JSX.Element {
  return <>{children}</>
}
