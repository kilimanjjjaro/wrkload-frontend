import clsx from 'clsx'
import { HEADLINE_VARIANTS } from 'constants/variants'

interface Props {
  variant: '2xl' | 'xl' | 'lg' | 'md'
  children: React.ReactNode
  className?: string
}

export default function Headline ({ className, variant, children }: Props): JSX.Element {
  return (
    <h2 className={clsx(
      variant === '2xl' && HEADLINE_VARIANTS['2XL'],
      variant === 'xl' && HEADLINE_VARIANTS.XL,
      variant === 'lg' && HEADLINE_VARIANTS.LG,
      variant === 'md' && HEADLINE_VARIANTS.MD,
      className
    )}
    >{children}
    </h2>
  )
}
