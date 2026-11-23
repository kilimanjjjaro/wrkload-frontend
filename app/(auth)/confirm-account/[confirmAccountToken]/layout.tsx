import type { ChildrenInterface } from 'interfaces/components'
import { pageMetadata } from 'constants/metadata'

export const metadata = pageMetadata('Confirm account - wrkload')

export default function ConfirmAccountTokenLayout ({ children }: ChildrenInterface): JSX.Element {
  return <>{children}</>
}
