import type { UserInterface } from 'interfaces/users/User'
import { ADMIN_ROLE, PARTNER_ROLE, TRIAL_ROLE } from 'constants/users'

interface Props {
  user: UserInterface
  trialAccountId: string
}

export default function RoleLabel ({ user, trialAccountId }: Props): React.JSX.Element {
  return (
    <>
      {user.role === ADMIN_ROLE && user._id !== trialAccountId && 'Administrator'}
      {user.role === TRIAL_ROLE && user._id === trialAccountId && 'Trial user'}
      {user.role === PARTNER_ROLE && user._id !== trialAccountId && 'Partner'}
    </>
  )
}
