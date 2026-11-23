import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Login - wrkload', '/login')

export default function LoginLayout({
  children
}: ChildrenInterface): React.JSX.Element {
  return <>{children}</>
}
