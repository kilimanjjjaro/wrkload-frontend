'use client'

import { useEffect, useState } from 'react'

export default function useDelayUnmount (dependency: boolean, delayTime: number): boolean {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId: number

    if (dependency && !shouldRender) {
      setShouldRender(true)
    } else if (!dependency && shouldRender) {
      timeoutId = window.setTimeout(
        () => setShouldRender(false),
        delayTime
      )
    }

    return () => clearTimeout(timeoutId)
  }, [dependency, delayTime, shouldRender])

  return shouldRender
}
