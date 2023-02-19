import clsx from 'clsx'

import type { InputInterface } from 'interfaces/components'

export default function Input ({ variant, onChange, onKeyUp, value, name, type, placeholder, autoComplete, centerText, required, disabled }: InputInterface): JSX.Element {
  return (
    <input
      className={clsx(
        'w-full h-10 px-5 text-sm leading-tight placeholder-opacity-100 appearance-none md:text-baseblock font-secondaryFont focus:outline-none focus:placeholder:opacity-0 autofill:bg-transparent transition duration-400 ease-in-out [color-scheme:dark]',
        variant === 'primary' && 'text-black placeholder-black bg-light-pink/70 hover:bg-light-pink focus:bg-light-pink',
        variant === 'alternative' && 'text-black placeholder-black bg-light-pink',
        disabled === true && 'text-white placeholder-white bg-light-pink cursor-not-allowed hover:bg-light-pink focus:bg-light-pink',
        centerText !== undefined && 'text-center'
      )}
      value={value} onChange={onChange} onKeyUp={onKeyUp} name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required} disabled={disabled}
    />
  )
}
