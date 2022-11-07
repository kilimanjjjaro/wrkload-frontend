import Image from 'next/image'
import Headline from './shared/Headline'
import Paragraph from './shared/Paragraph'

export default function Testimony ({ image, name, rol, text }) {
  return (
    <div className='flex flex-col items-center pt-8 mb-6 bg-gray-100 md:mb-10 pb-7 pl-7 pr-7 dark:bg-alternative rounded-3xl break-inside-avoid'>
      <Image
        className='object-cover w-20 h-20 mb-4 rounded-full'
        src={image}
        alt={name}
      />
      <div className='flex flex-col'>
        <Headline type='h5'>{name}</Headline>
        <div className='mb-4 text-sm font-bold'>{rol}</div>
        <Paragraph type='small'>{text}</Paragraph>
      </div>
    </div>
  )
}
