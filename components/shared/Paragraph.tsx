import clsx from 'clsx'

const VARIANTS = {
  NORMAL: 'text-xl font-secondaryFont',
  SM: 'text-base font-secondaryFont',
  XS: 'text-xs -mt-4 md:-mt-8 mb-6 md:mb-10 font-secondaryFont'
}

interface Props {
  children?: React.ReactNode
  variant: 'normal' | 'sm' | 'xs'
  className?: string
}

export default function Paragraph ({ className, children, variant }: Props): JSX.Element {
  return (
    <p
      className={clsx(
        'break-word',
        variant === 'normal' && VARIANTS.NORMAL,
        variant === 'sm' && VARIANTS.SM,
        variant === 'xs' && VARIANTS.XS,
        className
      )}
    >{children}
    </p>
  )
}
