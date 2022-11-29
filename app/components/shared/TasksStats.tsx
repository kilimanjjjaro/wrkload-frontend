interface Props {
  hours?: string
  text?: string
}

export default function TasksStats ({ hours, text }: Props): JSX.Element {
  return (
    <div className='relative flex flex-col items-start text-black border-4 border-gray-200 group p-7 md:mb-0 rounded-3xl dark:text-white'>
      <div className='text-4xl font-extrabold text-black font-secondaryFont dark:text-white'>
        {hours}
      </div>
      <span className='mt-1 text-3xl text-black font-secondaryFont dark:text-white'>{text}</span>
    </div>
  )
}
