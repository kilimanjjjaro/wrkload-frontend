import Link from 'next/link'

interface Props {
  link: Object
  children: React.ReactNode
}

export default function TextLink ({ children, link = '/' }: Props): JSX.Element {
  return <Link href={link} className='text-gray-200 transition ease-in-out duration-400 hover:text-white hover:drop-shadow-xl dark:hover:text-primary font-secondaryFont'>{children}</Link>
}
