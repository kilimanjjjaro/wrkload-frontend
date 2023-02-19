import clsx from 'clsx'

import type { ButtonInterface } from 'interfaces/components'

export default function Button ({ type, variant, disablePagination, onClick, fullWidth, children }: ButtonInterface): JSX.Element {
  return (
    <>
      <button
        className={clsx(
          'relative w-auto h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute before:transition before:duration-400 before:ease-in-out hover:before:translate-y-0',
          variant === 'primary' && ' text-white bg-white dark:text-black hover:text-black before:bg-pink',
          variant === 'secondary' && ' text-white bg-black hover:text-black before:bg-pink',
          variant === 'light-alternative' && 'text-black border-2 border-black fill-black dark:hover:text-black dark:border-black hover:fill-white hover:text-white dark:hover:fill-black dark:fill-black dark:hover:border-pink before:bg-pink',
          variant === 'dark-alternative' && 'text-white border-2 border-pink fill-black dark:hover:text-black dark:border-white hover:fill-white hover:text-black dark:hover:fill-black dark:fill-black dark:hover:border-pink before:bg-pink',
          fullWidth !== undefined && '!w-full',
          disablePagination === true && 'cursor-not-allowed !bg-light-pink/30 hover:text-white before:hidden'
        )}
        type={type} onClick={onClick}
        disabled={disablePagination}
      ><span className='relative flex items-center justify-center gap-2 px-5 md:text-base'>{children}</span>
      </button>
    </>
  )
}
