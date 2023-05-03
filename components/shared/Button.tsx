import clsx from 'clsx'
import type { ButtonInterface } from 'interfaces/components'

const VARIANTS = {
  PRIMARY: 'text-black bg-blue dark:bg-white dark:text-black md:hover:text-blue md:dark:hover:text-black before:bg-black dark:before:bg-blue',
  SECONDARY: 'text-blue dark:text-blue bg-black md:dark:hover:text-black md:hover:text-black before:bg-white',
  LIGHT_ALTERNATIVE: 'text-black before:bg-black md:hover:text-blue border-black dark:text-white border-2 dark:fill-white dark:border-white md:dark:hover:fill-black md:dark:hover:text-black dark:before:bg-white',
  DARK_ALTERNATIVE: 'text-black border-2 border-black fill-black md:hover:fill-blue md:hover:text-blue before:bg-black',
  DISABLED: 'cursor-not-allowed border-2 border-blue dark:border-white dark:text-white !bg-transparent hover:!text-black dark:hover:!text-white md:hover:!text-black md:dark:hover:!text-white before:hidden',
  LOADING: 'cursor-not-allowed before:animate-loading [&>div>svg]:!stroke-blue'
}

export default function Button ({ className, type, variant, disablePagination, onClick, children, isLoading, ariaLabel }: ButtonInterface): JSX.Element {
  return (
    <>
      <button
        aria-label={ariaLabel}
        className={clsx(
          'relative w-full h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute rounded-full before:transition before:duration-400 before:ease-in-out md:hover:before:translate-y-0',
          variant === 'primary' && VARIANTS.PRIMARY,
          variant === 'secondary' && VARIANTS.SECONDARY,
          variant === 'light-alternative' && VARIANTS.LIGHT_ALTERNATIVE,
          variant === 'dark-alternative' && VARIANTS.DARK_ALTERNATIVE,
          disablePagination === true && VARIANTS.DISABLED,
          isLoading === true && VARIANTS.LOADING,
          className
        )}
        type={type} onClick={onClick}
        disabled={disablePagination}
      ><div className='relative flex items-center justify-center gap-2 px-5 md:text-base'>{children}</div>
      </button>
    </>
  )
}
