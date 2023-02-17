import Languages from 'app/components/shared/Languages'
import ThemeSelector from 'app/components/shared/ThemeSelector'

export default function Footer (): JSX.Element {
  return (
    <footer className='fixed bottom-0 left-0 z-50 flex items-end justify-between w-full px-6 pb-6 mx-auto text-dark-gray md:pb-8 md:px-8'>
      <span className='text-sm font-secondaryFont'>
        © 2023 wrkload. All rights reserved.
      </span>
      <div className='flex gap-x-5'>
        <Languages />
        <ThemeSelector />
      </div>
    </footer>
  )
}
