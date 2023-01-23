export default function Skeleton ({ type }: { type: string }): JSX.Element {
  return (
    <>
      {type === 'task' && (
        <div className='flex flex-col items-start bg-white p-7 [&>*]:animate-pulse'>
          <div className='w-4/6 mb-4 xl:mb-5 h-9 bg-light-gray' />
          <div className='w-full h-28 bg-light-gray' />
          <div className='flex flex-wrap w-full gap-3 mt-4'>
            <div className='w-2/6 h-8 bg-light-gray' />
            <div className='w-2/6 h-8 bg-light-gray' />
          </div>
        </div>
      )}
      {type === 'user' && (
        <div className='flex flex-col items-start bg-white p-7 [&>*]:animate-pulse'>
          <div className='w-20 h-20 mb-4 xl:mb-5 bg-light-gray' />
          <div className='w-4/6 h-8 mb-4 xl:mb-6 bg-light-gray' />
          <div className='w-2/6 h-6 mb-4 xl:mb-7 bg-light-gray' />
          <div className='flex flex-wrap w-full gap-3'>
            <div className='w-2/6 h-8 bg-light-gray' />
            <div className='w-2/6 h-8 bg-light-gray' />
          </div>
        </div>
      )}
    </>
  )
}
