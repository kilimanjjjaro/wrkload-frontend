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
        className='flex -ml-[30px] w-auto'
        columnClassName='pl-10 [&>div]:mb-10'
      >
        {children}
      </Masonry>
    </>
  )
}
