'use client'

import { useEffect, useState } from 'react'

export default function useDelayUnmount (dependency: boolean, delayTime: number): boolean {
  const [isLeaving, setIsLeaving] = useState(false)
  const [previousDependency, setPreviousDependency] = useState(dependency)

  if (dependency !== previousDependency) {
    setPreviousDependency(dependency)
    setIsLeaving(!dependency)
  }

  useEffect(() => {
    if (!isLeaving) return

    const timeoutId = window.setTimeout(() => { setIsLeaving(false); }, delayTime)

    return () => { clearTimeout(timeoutId); }
  }, [isLeaving, delayTime])

  return dependency || isLeaving
}
