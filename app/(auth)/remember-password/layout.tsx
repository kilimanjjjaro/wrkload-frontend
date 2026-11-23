import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Remember password - wrkload', '/remember-password')

export default function RememberPasswordLayout ({ children }: ChildrenInterface): JSX.Element {
  return <>{children}</>
}
