import clsx from 'clsx'

interface Props {
  variant: 'primary' | 'alternative' | 'disabled'
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  value?: string | number
  name: string
  type: string
  placeholder: string
  autoComplete?: string
  centerText?: boolean
  required?: boolean
  disabled?: boolean
}

export default function Input ({ variant, onChange, onKeyUp, value, name, type, placeholder, autoComplete, centerText, required, disabled }: Props): JSX.Element {
  return (
    <input
      className={clsx(
        'w-full h-10 px-5 text-sm leading-tight placeholder-opacity-100 appearance-none md:text-baseblock font-secondaryFont focus:outline-none focus:placeholder:opacity-0 autofill:bg-transparent transition duration-400 ease-in-out',
        variant === 'primary' && 'text-white placeholder-white bg-light-gray hover:bg-dark-gray focus:bg-dark-gray',
        variant === 'alternative' && 'text-white placeholder-white bg-white',
        variant === 'disabled' && 'text-white placeholder-white bg-light-gray cursor-not-allowed',
        centerText !== undefined && 'text-center'
      )}
      value={value} onChange={onChange} onKeyUp={onKeyUp} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required} disabled={disabled}
    />
  )
}
