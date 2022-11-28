import Image, { StaticImageData } from 'next/image'

interface Props {
  image: StaticImageData
  name: string
  rol: string
  text: string
}

export default function Testimony ({ image, name, rol, text }: Props): JSX.Element {
  return (
    <div className='flex flex-col items-center mb-6 bg-gray-200 p-7 md:mb-10 dark:bg-alternative rounded-3xl break-inside-avoid'>
      <Image
        className='object-cover w-20 h-20 mb-4 rounded-full'
        src={image}
        alt={name}
      />
      <div className='flex flex-col'>
        <h5 className='text-2xl font-extrabold font-secondaryFont'>{name}</h5>
        <div className='mb-4 text-sm font-bold'>{rol}</div>
        <q className='text-sm md:text-base font-secondaryFont'>{text}</q>
      </div>
    </div>
  )
}
