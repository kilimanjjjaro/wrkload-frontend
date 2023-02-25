import clsx from 'clsx'

interface Props {
  variant: '2xl' | 'xl' | 'lg' | 'md'
  children: React.ReactNode
}

export default function Headline ({ variant, children }: Props): JSX.Element {
  return (
    <h2 className={clsx(
      variant === '2xl' && 'mb-10 text-[51px] leading-none font-bold md:mb-14 2xl:mb-16 font-primaryFont md:text-6xl xl:text-7xl 2xl:text-[5.5rem]',
      variant === 'xl' && 'text-4xl font-bold mb-7 md:mb-10 font-primaryFont md:text-6xl 2xl:text-7xl',
      variant === 'lg' && 'text-3xl mb-7 md:mb-10 font-primaryFont md:text-5xl 2xl:text-6xl',
      variant === 'md' && 'text-xl mb-7 md:mb-10 font-primaryFont md:text-3xl 2xl:text-4xl leading-tight font-bold'
    )}
    >{children}
    </h2>
  )
}
