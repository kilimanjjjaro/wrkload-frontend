import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata(
  'Remember password - wrkload',
  '/remember-password'
)

export default function RememberPasswordLayout({
  children
}: ChildrenInterface): React.JSX.Element {
  return <>{children}</>
}
