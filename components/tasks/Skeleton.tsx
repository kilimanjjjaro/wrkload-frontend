import MasonryGrid from 'components/shared/MasonryGrid'
import { SKELETON } from 'constants/components'

export default function Skeleton (): JSX.Element {
  return (
    <MasonryGrid>
      {SKELETON.map((_, index) => (
        <div key={index} className='flex flex-col items-start bg-white p-7 [&>*]:animate-pulse'>
          <div className='w-4/6 mb-4 xl:mb-5 h-9 bg-blue' />
          <div className='w-full h-28 bg-blue' />
          <div className='flex flex-wrap w-full gap-3 mt-4'>
            <div className='w-2/6 h-8 bg-blue' />
            <div className='w-2/6 h-8 bg-blue' />
          </div>
        </div>
      ))}
    </MasonryGrid>
  )
}
