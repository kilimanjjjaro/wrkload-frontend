import clsx from 'clsx'

interface Props {
  variant: 'primary' | 'alternative'
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

export default function Input ({ variant, onChange, onKeyUp, value, name, type, placeholder, autoComplete, centerText, required }: Props): JSX.Element {
  return (
    <input
      className={clsx(
        'w-full h-10 px-5 text-sm leading-tight placeholder-opacity-100 appearance-none md:text-baseblock font-secondaryFont focus:outline-none focus:placeholder:opacity-0 autofill:bg-transparent transition duration-400 ease-in-out',
        variant === 'primary' && 'text-white placeholder-white bg-light-gray dark:bg-alternative dark:text-white hover:bg-dark-gray dark:placeholder-white focus:bg-dark-gray',
        variant === 'alternative' && 'text-white placeholder-white bg-white dark:bg-alternative dark:text-white  dark:placeholder-white hover:bg-white',
        centerText !== undefined && 'text-center'
      )}
      value={value} onChange={onChange} onKeyUp={onKeyUp} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required}
    />
  )
}
