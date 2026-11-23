import Link from 'next/link'

interface Props {
  link?: string
  children: React.ReactNode
}

export default function TextLink ({ children, link = '/' }: Props): React.JSX.Element {
  return <Link href={link} className='text-black transition ease-in-out dark:text-white duration-400 hover:text-blue dark:hover:text-blue font-secondaryFont'>{children}</Link>
}
