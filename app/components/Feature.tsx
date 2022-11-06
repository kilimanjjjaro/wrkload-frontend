import Image from 'next/image'
import Headline from './shared/Headline'
import Paragraph from './shared/Paragraph'

export default function Feature ({ image, title, description }) {
  return (
    <div>
      <Image
        className='mb-8 md:mb-10 rounded-3xl'
        src={image}
        alt={title}
      />
      <div className='mx-auto md:w-2/5'>
        <Headline type='h3'>{title}</Headline>
        <Paragraph type='normal'>{description}</Paragraph>
      </div>
    </div>
  )
}
