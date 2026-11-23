import clsx from 'clsx'
import { EMPTY_LENGTH } from 'constants/math'
import {
  PASSWORD_GOOD_LENGTH,
  PASSWORD_MEDIUM_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_STRONG_LENGTH
} from 'constants/auth'

export default function PasswordStrength({
  password
}: {
  password: string
}): React.JSX.Element {
  const { length } = password

  return (
    <div
      className={clsx(
        'absolute flex items-center gap-x-1 right-3 pt-[2px]',
        length > EMPTY_LENGTH &&
          length < PASSWORD_MIN_LENGTH &&
          '[&>div]:bg-red!',
        length >= PASSWORD_MEDIUM_LENGTH &&
          length < PASSWORD_GOOD_LENGTH &&
          '[&>div]:bg-yellow!',
        length >= PASSWORD_STRONG_LENGTH && '[&>div]:bg-green!'
      )}
    >
      {length > EMPTY_LENGTH && (
        <div className='w-[5px] h-[5px] rounded-full' />
      )}
      {length >= PASSWORD_MEDIUM_LENGTH && (
        <div className='w-[5px] h-[5px] rounded-full' />
      )}
      {length >= PASSWORD_STRONG_LENGTH && (
        <div className='w-[5px] h-[5px] rounded-full' />
      )}
    </div>
  )
}
