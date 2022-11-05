export default function Headline ({ children, type }) {
  switch (type) {
    case 'h2':
      return <h2 className='mb-16 font-primaryFont font-bold text-8xl'>{children}</h2>
    case 'h3':
      return <h3 className='mb-12 font-primaryFont font-bold text-7xl'>{children}</h3>
    case 'h5':
      return <h5 className='font-secondaryFont font-extrabold text-2xl'>{children}</h5>
    default:
      break
  }
}
