import Image from 'next/image'
import Headline from './shared/Headline'
import Paragraph from './shared/Paragraph'

export default function Testimony ({ image, name, rol, text }) {
  return (
    <div className='flex flex-col items-center mb-10 pt-9 pr-8 pb-8 pl-8 bg-alternative rounded-3xl break-inside-avoid'>
      <Image
        className='mb-4 w-20 h-20 rounded-full object-cover'
        src={image}
        alt={name}
      />
      <div className='flex flex-col'>
        <Headline type='h5'>{name}</Headline>
        <div className='mb-4 font-bold text-sm'>{rol}</div>
        <Paragraph type='small'>{text}</Paragraph>
      </div>
    </div>
  )
}
