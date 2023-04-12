import ThemeSelector from 'components/shared/ThemeSelector'
import Languages from 'components/shared/Languages'

export default function Footer (): JSX.Element {
  return (
    <footer className='fixed bottom-0 left-0 flex items-center justify-between w-full px-6 pb-6 mx-auto text-black md:z-50 dark:text-blue md:pb-8 md:px-8'>
      <span className='text-sm font-light font-secondaryFont'>© 2023 wrkload.</span>
      <div className='flex gap-x-5'>
        <Languages />
        <ThemeSelector />
      </div>
    </footer>
  )
}
