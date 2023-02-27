import clsx from 'clsx'

interface Props {
  children?: React.ReactNode
  variant: 'normal' | 'sm' | 'xs'
}

export default function Paragraph ({ children, variant }: Props): JSX.Element {
  return (
    <p
      className={clsx(
        'break-word',
        variant === 'normal' && 'text-xl font-secondaryFont',
        variant === 'sm' && 'text-base font-secondaryFont',
        variant === 'xs' && 'text-xs -mt-4 md:-mt-8 mb-6 md:mb-10 font-secondaryFont'
      )}
    >{children}
    </p>
  )
}
