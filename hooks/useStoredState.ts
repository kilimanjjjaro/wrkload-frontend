'use client'

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { subscribeToNothing } from 'utils/noop'

export default function useStoredState<T> (
  key: string,
  parse: (stored: string) => T,
  fallback: T
): [T, Dispatch<SetStateAction<T>>] {
  const stored = useSyncExternalStore(
    subscribeToNothing,
    () => window.localStorage.getItem(key),
    () => null
  )
  const storedValue = useMemo(
    () => (stored === null ? fallback : parse(stored)),
    [stored, parse, fallback]
  )
  const [selected, setSelected] = useState<{ value: T } | null>(null)

  const setValue = useCallback<Dispatch<SetStateAction<T>>>((action) => {
    setSelected((previous) => {
      const current = previous === null ? storedValue : previous.value
      return { value: action instanceof Function ? action(current) : action }
    })
  }, [storedValue])

  return [selected === null ? storedValue : selected.value, setValue]
}
