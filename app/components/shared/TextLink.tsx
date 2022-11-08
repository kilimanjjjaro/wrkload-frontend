import Link from 'next/link'

export default function TextLink ({ children, link = '/' }) {
  return <Link className='text-black transition duration-500 ease-in-out dark:text-white hover:text-primary dark:hover:text-primary font-secondaryFont' href={link}>{children}</Link>
}
