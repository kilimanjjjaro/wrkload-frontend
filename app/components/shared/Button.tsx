import clsx from 'clsx'

import type { ButtonInterface } from 'interfaces/components'

export default function Button ({ type, variant, disablePagination, onClick, fullWidth, children }: ButtonInterface): JSX.Element {
  return (
    <>
      <button
        className={clsx(
          'relative w-auto h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute before:transition before:duration-400 before:ease-in-out hover:before:translate-y-0',
          variant === 'primary' && ' text-white bg-dark-gray hover:text-dark-gray before:bg-white',
          variant === 'secondary' && ' text-white bg-light-gray hover:text-white before:bg-dark-gray',
          variant === 'light-alternative' && 'text-light-gray border-2 border-light-gray fill-light-gray dark:hover:text-white dark:hover:bg-black dark:border-black hover:fill-white hover:text-white dark:hover:fill-white dark:fill-black before:bg-light-gray',
          variant === 'dark-alternative' && 'text-dark-gray border-2 border-dark-gray fill-dark-gray dark:hover:text-white dark:hover:bg-black dark:border-black hover:fill-white hover:text-white dark:hover:fill-white dark:fill-black before:bg-dark-gray',
          fullWidth !== undefined && '!w-full',
          disablePagination === true && 'cursor-not-allowed opacity-50 hover:text-white before:hidden'
        )}
        type={type} onClick={onClick}
        disabled={disablePagination}
      ><span className='relative flex items-center justify-center gap-2 px-5 md:text-base'>{children}</span>
      </button>
    </>
  )
}
