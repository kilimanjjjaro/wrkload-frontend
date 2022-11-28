// import Image from 'next/image'
import { StaticImageData } from 'next/image'
import Headline from './shared/Headline'
import Paragraph from './shared/Paragraph'

interface Props {
  image: StaticImageData
  title: string
  description: string
}

export default function Feature ({ image, title, description }: Props): JSX.Element {
  return (
    <div>
      {/* <Image
        className='mb-8 md:mb-10 rounded-3xl'
        src={image}
        alt={title}
      /> */}
      <div className='mb-8 md:mb-10 rounded-3xl w-full h-[300px] md:h-[450px] xl:h-[600px] 2xl:h-[750px] bg-gray-200 dark:bg-alternative' />
      <div className='mx-auto md:w-[66%] xl:w-[38%]'>
        <Headline variant='xl'>{title}</Headline>
        <Paragraph variant='normal'>{description}</Paragraph>
      </div>
    </div>
  )
}
