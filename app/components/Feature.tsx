import Image from 'next/image'
import Headline from './shared/Headline'
import Paragraph from './shared/Paragraph'

export default function Feature ({ image, title, description }) {
  return (
    <div>
      <Image
        className='mb-12 rounded-3xl'
        src={image}
        alt={title}
      />
      <div className='flex flex-col mx-auto w-2/5'>
        <Headline type='h3'>{title}</Headline>
        <Paragraph type='normal'>{description}</Paragraph>
      </div>
    </div>
  )
}
