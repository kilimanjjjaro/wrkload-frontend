import MasonryGrid from 'components/shared/MasonryGrid'
import { SKELETON } from 'constants/components'

export default function Skeleton (): JSX.Element {
  return (
    <MasonryGrid>
      {SKELETON.map((_, index) => (
        <div key={index} className=' flex flex-col items-start bg-light-blue dark:bg-white p-6 md:p-7 [&>*]:animate-skeleton rounded-3xl'>
          <div className='w-4/6 mb-4 xl:mb-5 h-9 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full' />
          <div className='w-full h-28 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-3xl' />
          <div className='flex flex-wrap w-full gap-3 mt-4'>
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full' />
            <div className='w-2/6 h-8 bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] rounded-full' />
          </div>
        </div>
      ))}
    </MasonryGrid>
  )
}
