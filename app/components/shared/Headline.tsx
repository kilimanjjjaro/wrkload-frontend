interface Props {
  variant: '2xl' | 'xl' | 'lg' | 'md'
  children: React.ReactNode
}

export default function Headline ({ variant, children }: Props): JSX.Element {
  return (
    <>
      {variant === '2xl' && <h2 className='mb-10 text-[51px] leading-none font-bold md:mb-14 2xl:mb-16 font-primaryFont md:text-6xl xl:text-7xl 2xl:text-8xl'>{children}</h2>}
      {variant === 'xl' && <h3 className='text-4xl font-bold mb-7 md:mb-10 font-primaryFont md:text-6xl 2xl:text-7xl'>{children}</h3>}
      {variant === 'lg' && <h3 className='text-3xl mb-7 md:mb-10 font-primaryFont md:text-5xl 2xl:text-6xl'>{children}</h3>}
      {variant === 'md' && <h3 className='text-xl mb-7 md:mb-10 font-primaryFont md:text-3xl 2xl:text-4xl'>{children}</h3>}
    </>
  )
}
