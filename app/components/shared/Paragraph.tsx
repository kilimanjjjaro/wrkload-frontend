export default function Paragraph ({ children, type }) {
  switch (type) {
    case 'normal':
      return <p className='text-base md:text-xl font-secondaryFont'>{children}</p>
    case 'small':
      return <p className='text-sm md:text-base font-secondaryFont'>{children}</p>
    default:
      break
  }
}
