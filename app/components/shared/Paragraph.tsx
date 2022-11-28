interface Props {
  children?: React.ReactNode
  variant: 'normal' | 'sm'
}

export default function Paragraph ({ children, variant }: Props): JSX.Element {
  return (
    <>
      {variant === 'normal' && <p className='text-base md:text-xl font-secondaryFont'>{children}</p>}
      {variant === 'sm' && <p className='text-sm font-secondaryFont'>{children}</p>}
    </>
  )
}
