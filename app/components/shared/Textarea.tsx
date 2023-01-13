import clsx from 'clsx'

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  name: string
  placeholder: string
  centerText?: boolean
}

export default function Textarea ({ onChange, value, name, placeholder, centerText }: Props): JSX.Element {
  return (
    <textarea
      className={clsx(
        'w-full p-5 text-sm leading-tight text-dark-gray placeholder-dark-gray placeholder-opacity-100 bg-gray-200 appearance-none resize-none md:text-baseblock h-36 rounded-3xl font-secondaryFont dark:bg-alternative dark:text-white focus:outline-none focus:bg-white dark:placeholder-white focus:placeholder:opacity-0 transition duration-400 ease-in-out',
        centerText !== undefined && 'placeholder:text-center'
      )} value={value} onChange={onChange} name={name} placeholder={placeholder}
    />
  )
}
