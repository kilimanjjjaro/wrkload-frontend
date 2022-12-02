import { StatsTasksInterface } from 'interfaces/tasks/Task'
import { Carousel } from './Carousel'
import { CarouselItem } from './CarouselItem'

interface Props {
  stats: StatsTasksInterface[]
}

export default function TasksStats ({ stats }: Props): JSX.Element {
  return (
    <Carousel variant='primary'>
      {stats.map((element) => (
        <CarouselItem key={element.id}>
          <div className='relative flex flex-col items-start text-black border-4 border-gray-200 group p-7 md:mb-0 rounded-3xl dark:text-white'>
            <div className='text-4xl font-extrabold text-black font-secondaryFont dark:text-white'>
              {element.hours}
            </div>
            <span className='mt-1 text-3xl text-black font-secondaryFont dark:text-white'>{element.text}</span>
          </div>
        </CarouselItem>
      ))}
    </Carousel>

  )
}
