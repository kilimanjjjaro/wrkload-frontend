import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'

export default function PerformanceIndicator ({ performance }: { performance: string | undefined }): React.JSX.Element {
  const performanceText = performance === 'better' ? 'better' : 'worse'

  return (
    <div className='relative flex items-center cursor-help group'>
      {performance === 'better' && <ArrowUpIcon className='w-4 stroke-green stroke-4' />}
      {performance === 'worse' && <ArrowDownIcon className='w-4 stroke-red stroke-4' />}
      <div className='absolute text-black left-6 w-max tracking-widest font-bold leading-none text-[8px] uppercase font-secondaryFont text-center bg-blue py-[7px] px-[10px] invisible transition-all duration-400 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible rounded-full'>
        Your current performance is being {performanceText}
      </div>
    </div>
  )
}
