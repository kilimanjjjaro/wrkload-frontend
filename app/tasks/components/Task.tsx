import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import Paragraph from '../../components/shared/Paragraph'

interface Props {
  title: String
  description: String
  deliveredAt: String
  timing: String
}

export default function Task ({ title, description, deliveredAt, timing }: Props): JSX.Element {
  return (
    <div className='flex flex-col bg-gray-100 p-7 dark:bg-white rounded-3xl break-inside-avoid'>
      <h3 className='mb-5 text-3xl font-bold font-primaryFont'>{title}</h3>
      <Paragraph type='small'>{description}</Paragraph>
      <div className='flex flex-wrap gap-3 mt-4'>
        <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><CalendarIcon className='w-4 stroke-width-2' /> {deliveredAt}</div>
        <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><ClockIcon className='w-4 stroke-width-2' /> {timing}</div>
      </div>
    </div>
  )
}
