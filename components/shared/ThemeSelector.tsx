'use client'

import { useEffect } from 'react'
import { MoonIcon, SunIcon } from 'components/shared/ThemeIcons'
import useStoredState from 'hooks/useStoredState'
import { parseStoredBoolean } from 'utils/storage'

export default function ThemeSelector (): React.JSX.Element {
  const [darkMode, setDarkMode] = useStoredState('darkMode', parseStoredBoolean, true)

  const toggleTheme = (): void => {
    setDarkMode(!darkMode)
    window.localStorage.setItem('darkMode', JSON.stringify(!darkMode))
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <button aria-label='Dark mode' className='transition ease-in-out duration-400 hover:text-blue dark:hover:text-white' onClick={toggleTheme}>{darkMode ? <MoonIcon /> : <SunIcon />}</button>
  )
}
