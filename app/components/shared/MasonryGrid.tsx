'use client'

import { Plock, Breakpoint } from 'react-plock'

const BREAKPOINTS: Breakpoint[] = [
  { size: 640, columns: 1 },
  { size: 768, columns: 2 },
  { size: 1280, columns: 4 }
]

interface Props {
  children: React.ReactNode
}

export default function MasonryGrid ({ children }: Props): JSX.Element {
  return (
    <>
      <Plock breakpoints={BREAKPOINTS} gap='2.5rem'>
        {children}
      </Plock>
    </>
  )
}
