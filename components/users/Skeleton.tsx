import MasonryGrid from 'components/shared/MasonryGrid'

import { SKELETON } from 'constants/components'

export default function Skeleton (): JSX.Element {
  return (
    <MasonryGrid>
      {SKELETON.map((_, index) => (
        <div key={index} className='flex flex-col items-start bg-white p-7 [&>*]:animate-skeleton'>
          <div className='w-20 h-20 mb-4 xl:mb-5 bg-gradient-to-r from-blue via-light-blue to-blue bg-[length:200%_100%]' />
          <div className='w-4/6 h-8 mb-4 xl:mb-6 bg-gradient-to-r from-blue via-light-blue to-blue bg-[length:200%_100%]' />
          <div className='w-2/6 h-6 mb-4 xl:mb-7 bg-gradient-to-r from-blue via-light-blue to-blue bg-[length:200%_100%]' />
          <div className='flex flex-wrap w-full gap-3'>
            <div className='w-2/6 h-8 bg-gradient-to-r from-blue via-light-blue to-blue bg-[length:200%_100%]' />
            <div className='w-2/6 h-8 bg-gradient-to-r from-blue via-light-blue to-blue bg-[length:200%_100%]' />
          </div>
        </div>
      ))}
    </MasonryGrid>
  )
}
