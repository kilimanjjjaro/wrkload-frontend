import { PASSWORD_MEDIUM_LENGTH } from 'constants/auth'

interface Props {
  password: string
  confirmation: string
}

export default function PasswordMatch ({ password, confirmation }: Props): React.JSX.Element {
  const shouldCompare = confirmation.length > PASSWORD_MEDIUM_LENGTH

  return (
    <div className='absolute flex items-center gap-x-1 right-3'>
      {shouldCompare && confirmation === password && (
        <svg className='w-[12px] h-[12px] stroke-green' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' strokeWidth='3' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
        </svg>
      )}

      {shouldCompare && confirmation !== password && (
        <svg className='w-[12px] h-[12px] stroke-red' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      )}
    </div>
  )
}
