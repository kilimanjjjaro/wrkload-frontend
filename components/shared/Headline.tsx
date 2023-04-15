import clsx from 'clsx'

interface Props {
  variant: '2xl' | 'xl' | 'lg' | 'md'
  children: React.ReactNode
  className?: string
}

export default function Headline ({ className, variant, children }: Props): JSX.Element {
  return (
    <h2 className={clsx(
      variant === '2xl' && 'mb-10 text-6xl leading-none font-bold md:mb-14 2xl:mb-16 font-primaryFont md:text-6xl xl:text-6xl 2xl:text-[5.5rem]',
      variant === 'xl' && 'text-4xl font-bold mb-7 md:mb-10 font-primaryFont md:text-6xl 2xl:text-7xl',
      variant === 'lg' && 'text-6xl mb-10 md:mb-10 font-primaryFont md:text-5xl 2xl:text-6xl',
      variant === 'md' && 'text-3xl leading-[1.2] mb-[1.4rem] md:mb-10 font-primaryFont md:text-3xl xl:text-4xl md:leading-tight font-bold',
      className
    )}
    >{children}
    </h2>
  )
}
