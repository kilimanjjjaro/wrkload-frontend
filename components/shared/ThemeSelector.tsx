'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from 'components/shared/ThemeIcons'

export default function ThemeSelector (): JSX.Element {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = (): void => {
    setDarkMode(!darkMode)
    window.localStorage.setItem('darkMode', JSON.stringify(!darkMode))
  }

  useEffect(() => {
    const darkModeFromLocalStorage = window.localStorage.getItem('darkMode')

    if (darkModeFromLocalStorage !== null) {
      setDarkMode(JSON.parse(darkModeFromLocalStorage))
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <button className='transition ease-in-out duration-400 hover:text-white' onClick={toggleTheme}>{darkMode ? <MoonIcon /> : <SunIcon />}</button>
  )
}
