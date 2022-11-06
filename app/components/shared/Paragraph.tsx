export default function Paragraph ({ children, type }) {
  switch (type) {
    case 'normal':
      return <p className='text-base text-black md:text-xl font-secondaryFont dark:text-white'>{children}</p>
    case 'small':
      return <p className='text-sm text-black md:text-base font-secondaryFont dark:text-white'>{children}</p>
    default:
      break
  }
}
