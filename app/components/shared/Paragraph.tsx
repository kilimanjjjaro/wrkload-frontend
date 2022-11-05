export default function Paragraph ({ children, type }) {
  switch (type) {
    case 'normal':
      return <p className='mb-8 font-secondaryFont text-xl'>{children}</p>
    case 'small':
      return <p className='font-secondaryFont text-base'>{children}</p>
    default:
      break
  }
}
