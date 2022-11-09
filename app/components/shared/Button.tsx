import Link from 'next/link'

interface Props {
  type: String
  link: Object
  children: React.ReactNode
}

export default function Headline ({ type, link = '/', children }: Props): JSX.Element {
  return (
    <>
      {type === 'primary' && <Link href={link} className='inline-flex items-center w-auto h-10 gap-2 px-5 text-sm font-semibold text-white transition duration-500 ease-in-out bg-black rounded-full dark:text-black dark:bg-white md:text-base hover:bg-primary dark:hover:bg-primary font-secondaryFont'>{children}</Link>}
    </>
  )
}
