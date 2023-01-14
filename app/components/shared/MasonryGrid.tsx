'use client'

import Masonry from 'react-masonry-css'

const BREAKPOINTS = {
  default: 4,
  768: 2,
  640: 1
}

export default function MasonryGrid ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <Masonry
        breakpointCols={BREAKPOINTS}
        className='grid items-start grid-cols-4 gap-x-10'
        columnClassName='!w-full grid gap-y-10'
      >
        {children}
      </Masonry>
    </>
  )
}
