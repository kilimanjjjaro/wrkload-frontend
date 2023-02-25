import clsx from 'clsx'

import type { ButtonInterface } from 'interfaces/components'

export default function Button ({ type, variant, disablePagination, onClick, fullWidth, children }: ButtonInterface): JSX.Element {
  return (
    <>
      <button
        className={clsx(
          'relative w-auto h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute before:transition before:duration-400 before:ease-in-out hover:before:translate-y-0',
          variant === 'primary' && 'text-black bg-blue dark:bg-white dark:text-black hover:text-blue dark:hover:text-black before:bg-black dark:before:bg-blue',
          variant === 'secondary' && ' text-blue dark:text-blue bg-black dark:hover:text-black hover:text-black before:bg-white',
          variant === 'light-alternative' && 'text-black before:bg-black hover:text-blue border-black dark:text-white border-2 dark:fill-white dark:border-white dark:hover:fill-black dark:hover:text-black dark:before:bg-white',
          variant === 'dark-alternative' && 'text-black border-2 border-black fill-black hover:fill-blue hover:text-blue before:bg-black',
          fullWidth !== undefined && '!w-full',
          disablePagination === true && 'cursor-not-allowed !bg-blue hover:!text-black dark:hover:text-black before:hidden'
        )}
        type={type} onClick={onClick}
        disabled={disablePagination}
      ><span className='relative flex items-center justify-center gap-2 px-5 md:text-base'>{children}</span>
      </button>
    </>
  )
}
