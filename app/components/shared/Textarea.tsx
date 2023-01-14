import clsx from 'clsx'

interface Props {
  variant: 'primary' | 'alternative'
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  name: string
  placeholder: string
  centerText?: boolean
}

export default function Textarea ({ variant, onChange, value, name, placeholder, centerText }: Props): JSX.Element {
  return (
    <textarea
      className={clsx(
        'w-full p-5 text-sm leading-tight placeholder-opacity-100 appearance-none resize-none md:text-baseblock h-36 font-secondaryFont focus:outline-none focus:placeholder:opacity-0 transition duration-400 ease-in-out',
        variant === 'primary' && 'text-white placeholder-white bg-light-gray hover:bg-dark-gray focus:bg-dark-gray',
        variant === 'alternative' && 'text-white placeholder-white bg-white',
        centerText !== undefined && 'text-center'
      )} value={value} onChange={onChange} name={name} placeholder={placeholder}
    />
  )
}
