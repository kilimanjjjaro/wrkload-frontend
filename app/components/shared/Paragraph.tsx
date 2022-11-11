interface Props {
  children?: React.ReactNode
  type: String
}

export default function Paragraph ({ children, type }: Props): JSX.Element {
  switch (type) {
    case 'normal':
      return <p className='text-base md:text-xl font-secondaryFont'>{children}</p>
    case 'small':
      return <p className='text-sm font-secondaryFont'>{children}</p>
    default:
      return <p className='text-base md:text-xl font-secondaryFont'>{children}</p>
  }
}
