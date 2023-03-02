import clsx from 'clsx'

import type { ButtonInterface } from 'interfaces/components'

export default function Button ({ className, type, variant, disablePagination, onClick, autoWidth, children, isLoading }: ButtonInterface): JSX.Element {
  return (
    <>
      <button
        className={clsx(
          className,
          'relative w-full h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute rounded-full before:transition before:duration-400 before:ease-in-out md:hover:before:translate-y-0',
          variant === 'primary' && 'text-black bg-blue dark:bg-white dark:text-black md:hover:text-blue md:dark:hover:text-black before:bg-black dark:before:bg-blue',
          variant === 'secondary' && ' text-blue dark:text-blue bg-black md:dark:hover:text-black md:hover:text-black before:bg-white',
          variant === 'light-alternative' && 'text-black before:bg-black md:hover:text-blue border-black dark:text-white border-2 dark:fill-white dark:border-white md:dark:hover:fill-black md:dark:hover:text-black dark:before:bg-white',
          variant === 'dark-alternative' && 'text-black border-2 border-black fill-black md:hover:fill-blue md:hover:text-blue before:bg-black',
          autoWidth !== undefined && 'md:!w-auto',
          disablePagination === true && 'cursor-not-allowed border-2 border-blue dark:border-white dark:text-white !bg-transparent hover:!text-black dark:hover:!text-white md:hover:!text-black md:dark:hover:!text-white before:hidden',
          isLoading === true && 'cursor-not-allowed before:animate-loading [&>div>svg]:!stroke-blue'
        )}
        type={type} onClick={onClick}
        disabled={disablePagination}
      ><div className='relative flex items-center justify-center gap-2 px-5 md:text-base'>{children}</div>
      </button>
    </>
  )
}
