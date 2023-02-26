'use client'

import Masonry from 'react-masonry-css'

import type { ChildrenInterface } from 'interfaces/components'
import { MASONRY_BREAKPOINTS } from 'constants/components'

export default function MasonryGrid ({ children }: ChildrenInterface): JSX.Element {
  return (
    <>
      <Masonry
        breakpointCols={MASONRY_BREAKPOINTS}
        className='grid items-start md:grid-cols-4 gap-y-6 md:gap-y-0 gap-x-10'
        columnClassName='!w-full grid gap-y-6 md:gap-y-10'
      >
        {children}
      </Masonry>
    </>
  )
}
