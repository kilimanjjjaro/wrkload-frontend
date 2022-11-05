export default function Button ({ children, type }) {
  return (
    type === 'primary' && <button className='flex items-center gap-1 px-5 h-10 bg-white hover:bg-primary rounded-full font-secondaryFont font-semibold text-black transition ease-in-out duration-500'>{children}</button>
  )
}
