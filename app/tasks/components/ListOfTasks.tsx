import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import Paragraph from 'app/components/shared/Paragraph'
import TaskInterface from 'interfaces/tasks/Task'

const fetchTasks = (): TaskInterface[] => {
  const tasks = [
    { id: 1, title: 'Develope API of products', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 2, title: 'Set environment variables on project', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 3, title: 'Test news API', description: 'If you are among the best at what you do we invite you...', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 4, title: 'Develope API of products', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 5, title: 'Develope API of products', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 6, title: 'Set env variables on project', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 7, title: 'Test news API', description: 'If you are among the best at what you do we invite you...', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 8, title: 'Develope API of products', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 9, title: 'Develope API of products', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 10, title: 'Develope API of products', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 11, title: 'Set environment variables on project', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' },
    { id: 12, title: 'Test news API', description: 'If you are among the best at what you do we invite you...', deliveredAt: '05/09/2022', timing: '2 hours' }
  ]
  return tasks
}

export default async function ListOfTasks (): Promise<JSX.Element> {
  const tasks = await fetchTasks()

  return (
    <MasonryGrid>
      {tasks.map((task, index) => (
        <div key={index} className='flex flex-col bg-gray-100 p-7 dark:bg-white rounded-3xl'>
          <h3 className='mb-5 text-3xl font-bold font-primaryFont'>{task.title}</h3>
          <Paragraph type='small'>{task.description}</Paragraph>
          <div className='flex flex-wrap gap-3 mt-4'>
            <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><CalendarDaysIcon className='w-4 stroke-width-2' /> {task.deliveredAt}</div>
            <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><ClockIcon className='w-4 stroke-width-2' /> {task.timing}</div>
          </div>
        </div>
      ))}
    </MasonryGrid>
  )
}
