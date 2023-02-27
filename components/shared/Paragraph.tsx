import clsx from 'clsx'

interface Props {
  children?: React.ReactNode
  variant: 'normal' | 'sm'
}

export default function Paragraph ({ children, variant }: Props): JSX.Element {
  return (
    <p
      className={clsx(
        'break-word',
        variant === 'normal' && 'text-xl font-secondaryFont',
        variant === 'sm' && 'text-base font-secondaryFont'
      )}
    >{children}
    </p>
  )
}
