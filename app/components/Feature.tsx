// import Image from 'next/image'
import FeaturesInterface from 'interfaces/home/Features'
import Headline from 'app/components/shared/Headline'
import Paragraph from 'app/components/shared/Paragraph'

export default function Feature ({ image, title, description }: FeaturesInterface): JSX.Element {
  return (
    <div>
      {/* <Image
        className='mb-8 md:mb-10 '
        src={image}
        alt={title}
      /> */}
      <div className='mb-8 md:mb-10  w-full h-[300px] md:h-[450px] xl:h-[600px] 2xl:h-[750px] bg-white dark:bg-alternative' />
      <div className='mx-auto md:w-[66%] xl:w-[38%]'>
        <Headline variant='xl'>{title}</Headline>
        <Paragraph variant='normal'>{description}</Paragraph>
      </div>
    </div>
  )
}
