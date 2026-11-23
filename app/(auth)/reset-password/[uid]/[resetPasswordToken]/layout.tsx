import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Reset password - wrkload')

export default function ResetPasswordTokenLayout({
  children
}: ChildrenInterface): React.JSX.Element {
  return <>{children}</>
}
