import MasonryGrid from 'components/shared/MasonryGrid'
import { SKELETON } from 'constants/components'

export default function Skeleton (): JSX.Element {
  return (
    <MasonryGrid>
      {SKELETON.map((_, index) => (
        <div key={index} className='flex flex-col items-start bg-white p-7 [&>*]:animate-pulse'>
          <div className='w-4/6 mb-4 bg-blue xl:mb-5 h-9' />
          <div className='w-2/6 h-8 mt-4 bg-blue' />
        </div>
      ))}
    </MasonryGrid>
  )
}
