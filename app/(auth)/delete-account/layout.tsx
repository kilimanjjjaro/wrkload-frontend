import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Delete account - wrkload', '/delete-account')

export default function DeleteAccountLayout ({ children }: ChildrenInterface): React.JSX.Element {
  return <>{children}</>
}
