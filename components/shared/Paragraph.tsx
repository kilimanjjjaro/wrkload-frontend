import clsx from 'clsx'
import { PARAGRAPH_VARIANTS } from 'constants/variants'

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
        variant === 'normal' && PARAGRAPH_VARIANTS.NORMAL,
        variant === 'sm' && PARAGRAPH_VARIANTS.SM,
        variant === 'xs' && PARAGRAPH_VARIANTS.XS,
        className
      )}
    >{children}
    </p>
  )
}
