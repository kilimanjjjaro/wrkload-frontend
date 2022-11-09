
interface Props {
  type: String
  children: React.ReactNode
}

export default function Headline ({ type, children }: Props): JSX.Element {
  switch (type) {
    case 'h2':
      return <h2 className='mb-10 text-[51px] leading-none font-bold md:mb-14 2xl:mb-16 font-primaryFont md:text-6xl xl:text-7xl 2xl:text-8xl'>{children}</h2>
    case 'h3':
      return <h3 className='text-4xl font-bold mb-7 md:mb-10 font-primaryFont md:text-6xl 2xl:text-7xl'>{children}</h3>
    case 'h5':
      return <h5 className='text-2xl font-extrabold font-secondaryFont'>{children}</h5>
    default:
      return <h2 className='mb-10 text-[51px] leading-none font-bold md:mb-14 2xl:mb-16 font-primaryFont md:text-6xl xl:text-7xl 2xl:text-8xl'>{children}</h2>
  }
}
