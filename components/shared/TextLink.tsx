import Link from 'next/link'

interface Props {
  link: Object
  children: React.ReactNode
}

export default function TextLink ({ children, link = '/' }: Props): JSX.Element {
  return <Link href={link} className='text-white transition ease-in-out duration-400 hover:text-white dark:hover:text-blue font-secondaryFont'>{children}</Link>
}
