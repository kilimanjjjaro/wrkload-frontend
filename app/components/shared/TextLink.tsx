import Link from 'next/link'

export default function TextLink ({ children, link = '/' }) {
  return <Link className='text-white transition duration-500 ease-in-out hover:text-primary font-secondaryFont' href={link}>{children}</Link>
}
