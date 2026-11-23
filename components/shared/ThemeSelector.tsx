'use client'

import { useEffect } from 'react'
import { MoonIcon, SunIcon } from 'components/shared/ThemeIcons'
import useStoredState from 'hooks/useStoredState'

const parseDarkMode = (stored: string): boolean => JSON.parse(stored)

export default function ThemeSelector (): React.JSX.Element {
  const [darkMode, setDarkMode] = useStoredState('darkMode', parseDarkMode, true)

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
