'use client'

import { LayoutProps } from 'interfaces/components'
import { Plock, Breakpoint } from 'react-plock'

const BREAKPOINTS: Breakpoint[] = [
  { size: 640, columns: 1 },
  { size: 768, columns: 2 },
  { size: 1280, columns: 4 }
]

export default function MasonryGrid ({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Plock breakpoints={BREAKPOINTS} gap='2.5rem'>
        {children}
      </Plock>
    </>
  )
}
