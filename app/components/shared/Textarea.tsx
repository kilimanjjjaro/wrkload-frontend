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
        'w-full p-5 text-sm leading-tight text-black placeholder-black placeholder-opacity-100 bg-gray-200 appearance-none resize-none md:text-baseblock h-36 rounded-3xl font-secondaryFont dark:bg-alternative dark:text-white focus:outline-none dark:placeholder-white focus:placeholder:opacity-0',
        { 'placeholder:text-center': centerText })} value={value} onChange={onChange} name={name} placeholder={placeholder}
    />
  )
}
