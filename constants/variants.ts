export const BUTTON_VARIANTS = {
  PRIMARY: 'text-black bg-blue dark:bg-white dark:text-black md:hover:text-blue md:dark:hover:text-black before:bg-black dark:before:bg-blue',
  SECONDARY: 'text-blue dark:text-blue bg-black md:dark:hover:text-black md:hover:text-black before:bg-white',
  LIGHT_ALTERNATIVE: 'text-black before:bg-black md:hover:text-blue border-black dark:text-white border-2 dark:fill-white dark:border-white md:dark:hover:fill-black md:dark:hover:text-black dark:before:bg-white',
  DARK_ALTERNATIVE: 'text-black border-2 border-black fill-black md:hover:fill-blue md:hover:text-blue before:bg-black',
  DISABLED: 'cursor-not-allowed border-2 border-blue dark:border-white dark:text-white !bg-transparent hover:!text-black dark:hover:!text-white md:hover:!text-black md:dark:hover:!text-white before:hidden',
  LOADING: 'cursor-not-allowed before:animate-loading [&>div>svg]:!stroke-blue'
}

export const HEADLINE_VARIANTS = {
  '2XL': 'mb-10 text-6xl leading-none font-bold md:mb-14 2xl:mb-16 font-primaryFont md:text-6xl xl:text-6xl 2xl:text-[5.5rem]',
  XL: 'text-4xl font-bold mb-7 md:mb-10 font-primaryFont md:text-6xl 2xl:text-7xl',
  LG: 'text-6xl mb-10 md:mb-10 font-primaryFont md:text-5xl 2xl:text-6xl',
  MD: 'text-3xl leading-[1.2] mb-[1.4rem] md:mb-6 font-primaryFont md:text-3xl xl:text-4xl md:leading-tight font-bold'
}

export const INPUT_VARIANTS = {
  DISABLED: 'text-black placeholder-black bg-light-blue cursor-not-allowed hover:!bg-light-blue focus:!bg-light-blue',
  CENTERED: 'text-center'
}

export const PARAGRAPH_VARIANTS = {
  NORMAL: 'text-xl font-secondaryFont',
  SM: 'text-base font-secondaryFont',
  XS: 'text-xs -mt-4 md:-mt-8 mb-6 md:mb-10 font-secondaryFont'
}

export const TEXTAREA_VARIANTS = {
  CENTERED: 'text-center'
}
