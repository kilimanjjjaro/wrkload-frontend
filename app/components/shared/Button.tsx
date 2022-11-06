import Link from 'next/link'

export default function Button ({ children, type, link = '/' }) {
  return (
    type === 'primary' && <Link href={link} className='inline-flex items-center w-auto h-10 gap-2 px-5 text-sm font-semibold text-black transition duration-500 ease-in-out bg-white rounded-full md:text-base hover:bg-primary font-secondaryFont'>{children}</Link>
  )
}
