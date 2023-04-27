import clsx from 'clsx'
import { INPUT_VARIANTS } from 'constants/variants'
import type { InputInterface } from 'interfaces/components'

export default function Input ({ onChange, value, name, type, placeholder, autoComplete, centerText, required, disabled, minLength, maxLength, className }: InputInterface): JSX.Element {
  return (
    <input
      className={clsx(
        'w-full h-10 px-5 text-sm leading-tight placeholder-opacity-100 appearance-none md:text-baseblock font-secondaryFont focus:outline-none focus:placeholder:opacity-0 autofill:bg-transparent transition duration-400 ease-in-out [color-scheme:dark] rounded-full text-black placeholder-black bg-light-blue hover:bg-white focus:bg-white focus:invalid:border-2 focus:invalid:border-red',
        centerText !== undefined && INPUT_VARIANTS.CENTERED,
        disabled === true && INPUT_VARIANTS.DISABLED,
        className
      )}
      value={value}
      onChange={onChange}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      disabled={disabled}
      minLength={minLength}
      maxLength={maxLength}
    />
  )
}
