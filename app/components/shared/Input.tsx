import clsx from 'clsx'

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  type: 'text' | 'password' | 'email'
  placeholder: string
  autoComplete: string
  centerText?: boolean
  required?: boolean
}

export default function Input ({ onChange, value, type, placeholder, autoComplete, centerText, required }: Props): JSX.Element {
  return (
    <input
      className={clsx(
        'w-full h-10 px-5 text-sm leading-tight text-black placeholder-black placeholder-opacity-100 bg-gray-200 rounded-full appearance-none md:text-baseblock font-secondaryFont dark:bg-alternative dark:text-white focus:outline-none dark:placeholder-white focus:placeholder:opacity-0 autofill:bg-transparent',
        { 'text-center': centerText }
      )}
      value={value} onChange={onChange} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required}
    />
  )
}
