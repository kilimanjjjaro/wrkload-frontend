import TestimoniesInterface from 'interfaces/home/Testimonies'
import Image from 'next/image'

export default function Testimony ({ image, name, rol, text }: TestimoniesInterface): JSX.Element {
  return (
    <div className='flex flex-col items-center mb-6 text-black bg-white p-7 md:mb-10 dark:bg-alternative  break-inside-avoid'>
      <Image
        className='object-cover w-20 h-20 mb-4 '
        src={image}
        alt={name}
      />
      <div className='flex flex-col text-dark-gray'>
        <h5 className='text-2xl font-extrabold font-secondaryFont'>{name}</h5>
        <div className='mb-4 text-sm font-bold'>{rol}</div>
        <q className='text-sm md:text-base font-secondaryFont'>{text}</q>
      </div>
    </div>
  )
}
