import clsx from 'clsx'

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  value?: string
  name: string
  type: 'text' | 'password' | 'email' | 'date' | 'time'
  placeholder: string
  autoComplete?: string
  centerText?: boolean
  required?: boolean
}

export default function Input ({ onChange, onKeyUp, value, name, type, placeholder, autoComplete, centerText, required }: Props): JSX.Element {
  return (
    <input
      className={clsx(
        'w-full h-10 px-5 text-sm leading-tight text-dark-gray placeholder-dark-gray placeholder-opacity-100 bg-gray-200 rounded-full appearance-none md:text-baseblock font-secondaryFont dark:bg-alternative dark:text-white focus:outline-none dark:placeholder-white focus:bg-white focus:placeholder:opacity-0 autofill:bg-transparent transition duration-400 ease-in-out',
        centerText !== undefined && 'text-center'
      )}
      value={value} onChange={onChange} onKeyUp={onKeyUp} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required}
    />
  )
}
