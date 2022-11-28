import clsx from 'clsx'

interface Props {
  type: 'text' | 'password' | 'email'
  placeholder: string
  autoComplete: string
  centerText?: boolean
}

export default function Input ({ type, placeholder, autoComplete, centerText }: Props): JSX.Element {
  return (
    <input
      className={clsx(
        'w-full h-10 px-5 text-sm leading-tight text-black placeholder-black placeholder-opacity-100 bg-gray-200 rounded-full appearance-none md:text-baseblock font-secondaryFont dark:bg-alternative dark:text-white focus:outline-none dark:placeholder-white focus:placeholder:opacity-0',
        { 'text-center': centerText }
      )}
      type={type} placeholder={placeholder} autoComplete={autoComplete}
    />
  )
}
