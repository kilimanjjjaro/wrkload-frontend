interface Props {
  placeholder: string
}

export default function Textarea ({ placeholder }: Props): JSX.Element {
  return <textarea className='w-full p-5 mb-6 text-sm leading-tight text-black placeholder-black placeholder-opacity-100 bg-gray-200 appearance-none resize-none md:mb-5 md:text-baseblock h-36 rounded-3xl font-secondaryFont dark:bg-alternative dark:text-white focus:outline-none dark:placeholder-white focus:placeholder:opacity-0' placeholder={placeholder} />
}
