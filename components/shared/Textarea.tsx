import clsx from 'clsx'
import { CHARACTER_LIMIT } from 'constants/components'

import type { TextareaInterface } from 'interfaces/components'

export default function Textarea ({ className, onChange, value, name, placeholder, centerText }: TextareaInterface): JSX.Element {
  return (
    <textarea
      className={clsx(
        'w-full py-[19px] px-5 text-sm leading-tight placeholder-opacity-100 appearance-none resize-none md:text-baseblock h-[147px] font-secondaryFont focus:outline-none focus:placeholder:opacity-0 transition duration-400 ease-in-out rounded-3xl text-black placeholder-black bg-light-blue hover:bg-white focus:bg-white',
        centerText !== undefined && 'text-center',
        className
      )} value={value} onChange={onChange} name={name} placeholder={placeholder} maxLength={CHARACTER_LIMIT}
    />
  )
}
