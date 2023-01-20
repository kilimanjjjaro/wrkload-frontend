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
        variant === 'normal' && 'text-base md:text-xl font-secondaryFont',
        variant === 'sm' && 'text-sm font-secondaryFont'
      )}
    >{children}
    </p>
  )
}
