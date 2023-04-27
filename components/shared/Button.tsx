import clsx from 'clsx'
import { BUTTON_VARIANTS } from 'constants/variants'
import type { ButtonInterface } from 'interfaces/components'

export default function Button ({ className, type, variant, disablePagination, onClick, children, isLoading, ariaLabel }: ButtonInterface): JSX.Element {
  return (
    <>
      <button
        aria-label={ariaLabel}
        className={clsx(
          'relative w-full h-10 overflow-hidden text-sm transition duration-400 ease-in-out font-secondaryFont before:top-0 before:left-0 before:w-full before:h-full before:translate-y-full before:absolute rounded-full before:transition before:duration-400 before:ease-in-out md:hover:before:translate-y-0',
          variant === 'primary' && BUTTON_VARIANTS.PRIMARY,
          variant === 'secondary' && BUTTON_VARIANTS.SECONDARY,
          variant === 'light-alternative' && BUTTON_VARIANTS.LIGHT_ALTERNATIVE,
          variant === 'dark-alternative' && BUTTON_VARIANTS.DARK_ALTERNATIVE,
          disablePagination === true && BUTTON_VARIANTS.DISABLED,
          isLoading === true && BUTTON_VARIANTS.LOADING,
          className
        )}
        type={type} onClick={onClick}
        disabled={disablePagination}
      ><div className='relative flex items-center justify-center gap-2 px-5 md:text-base'>{children}</div>
      </button>
    </>
  )
}
