import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata(
  'Resend confirmation account link - wrkload',
  '/resend-confirmation-account-link'
)

export default function ResendConfirmationAccountLinkLayout({
  children
}: ChildrenInterface): React.JSX.Element {
  return <>{children}</>
}
