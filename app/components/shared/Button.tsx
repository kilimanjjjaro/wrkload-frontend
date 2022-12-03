import clsx from 'clsx'

interface Props {
  variant: 'primary' | 'secondary' | 'alternative'
  onClick?: () => void
  fullwidth?: Boolean
  children: React.ReactNode
}

export default function Button ({ variant, onClick, fullwidth, children }: Props): JSX.Element {
  return (
    <>
      {variant === 'primary' && <button onClick={onClick} className={clsx('inline-flex justify-center items-center w-auto h-10 gap-2 px-5 text-sm font-semibold text-white transition duration-500 ease-in-out bg-black rounded-full dark:text-black dark:bg-white md:text-base hover:bg-primary dark:hover:bg-primary font-secondaryFont', { '!w-full': fullwidth })}>{children}</button>}

      {variant === 'secondary' && <button onClick={onClick} className={clsx('inline-flex justify-center items-center w-auto h-10 gap-2 px-5 text-sm font-semibold text-black transition duration-500 ease-in-out bg-white rounded-full dark:text-white dark:bg-black md:text-base hover:bg-primary dark:hover:bg-primary font-secondaryFont', { '!w-full': fullwidth })}>{children}</button>}

      {variant === 'alternative' && <button onClick={onClick} className={clsx('inline-flex justify-center items-center w-auto h-10 gap-2 px-5 text-sm font-semibold text-black transition duration-500 ease-in-out border-2 border-white rounded-full dark:hover:text-white dark:hover:bg-black dark:border-black md:text-base font-secondaryFont hover:bg-white hover:fill-black hover:text-black fill-white dark:hover:fill-white dark:fill-black', { '!w-full': fullwidth })}>{children}</button>}
    </>
  )
}
