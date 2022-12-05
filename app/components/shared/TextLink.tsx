import Link from 'next/link'

interface Props {
  link: Object
  children: React.ReactNode
}

export default function TextLink ({ children, link = '/' }: Props): JSX.Element {
  return <Link href={link} className='text-black transition duration-400 ease-in-out dark:text-white hover:text-primary dark:hover:text-primary font-secondaryFont'>{children}</Link>
}
