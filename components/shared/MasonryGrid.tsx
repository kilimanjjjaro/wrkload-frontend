'use client'

import Masonry from 'react-masonry-css'

import type { ChildrenInterface } from 'interfaces/components'
import { MASONRY_BREAKPOINTS } from 'constants/components'

export default function MasonryGrid ({ children }: ChildrenInterface): JSX.Element {
  return (
    <>
      <Masonry
        breakpointCols={MASONRY_BREAKPOINTS}
        className='grid items-start gap-6 md:gap-10 md:grid-cols-2 xl:grid-cols-4'
        columnClassName='!w-full grid gap-y-6 md:gap-y-10'
      >
        {children}
      </Masonry>
    </>
  )
}
