export default function Headline ({ children, type }) {
  switch (type) {
    case 'h2':
      return <h2 className='mb-10 text-5xl font-bold md:mb-16 font-primaryFont md:text-8xl'>{children}</h2>
    case 'h3':
      return <h3 className='text-4xl font-bold mb-7 md:mb-12 font-primaryFont md:text-7xl'>{children}</h3>
    case 'h5':
      return <h5 className='text-2xl font-extrabold font-secondaryFont'>{children}</h5>
    default:
      break
  }
}
