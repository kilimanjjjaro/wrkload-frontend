import clsx from 'clsx'

interface Props {
  type?: 'submit'
  variant: 'primary' | 'secondary' | 'alternative'
  onClick?: (() => void) | ((event: any) => void)
  fullWidth?: Boolean
  children: React.ReactNode
}

export default function Button ({ type, variant, onClick, fullWidth, children }: Props): JSX.Element {
  return (
    <>
      <button
        className={clsx(
          variant === 'primary' && 'inline-flex justify-center items-center w-auto h-10 gap-2 px-5 text-sm font-semibold text-dark-gray transition duration-400 ease-in-out bg-gray-200 rounded-full dark:text-black md:text-base hover:bg-white hover:drop-shadow-xl dark:hover:bg-primary font-secondaryFont',
          variant === 'secondary' && 'inline-flex justify-center items-center w-auto h-10 gap-2 px-5 text-sm font-semibold text-black transition duration-400 ease-in-out bg-white rounded-full dark:text-white dark:hover:text-black dark:bg-black md:text-base hover:bg-primary dark:hover:bg-primary font-secondaryFont',
          variant === 'alternative' && 'inline-flex justify-center items-center w-auto h-10 gap-2 px-5 text-sm font-semibold text-black transition duration-400 ease-in-out border-2 border-white rounded-full dark:hover:text-white dark:hover:bg-black dark:border-black md:text-base font-secondaryFont hover:bg-white hover:fill-black hover:text-black fill-white dark:hover:fill-white dark:fill-black',
          fullWidth !== undefined && '!w-full'
        )}
        type={type} onClick={onClick}
      >{children}
      </button>
    </>
  )
}
