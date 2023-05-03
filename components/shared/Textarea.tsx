import clsx from 'clsx'
import type { TextareaInterface } from 'interfaces/components'

const VARIANTS = {
  CENTERED: 'text-center'
}

export default function Textarea ({ className, onChange, value, name, placeholder, centerText, maxLength }: TextareaInterface): JSX.Element {
  return (
    <textarea
      className={clsx(
        'w-full py-[19px] px-5 text-sm leading-tight placeholder-opacity-100 appearance-none resize-none block h-[150px] md:h-[161px] font-secondaryFont focus:outline-none focus:placeholder:opacity-0 transition duration-400 ease-in-out rounded-3xl text-black placeholder-black bg-light-blue hover:bg-white focus:bg-white',
        centerText !== undefined && VARIANTS.CENTERED,
        className
      )}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  )
}
