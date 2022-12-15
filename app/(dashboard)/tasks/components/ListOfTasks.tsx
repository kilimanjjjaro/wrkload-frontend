import { CalendarIcon, ClockIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import Paragraph from 'app/components/shared/Paragraph'
import ProjectStats from 'app/components/shared/ProjectStats'
import TaskInterface from 'interfaces/tasks/Task'

const fetchTasks = (): TaskInterface[] => {
  const data = [
    // {
    //   stats: [
    //     { id: 1, hours: '200', text: 'hours worked in the month in this project.' },
    //     { id: 2, hours: '240', text: 'hours worked last month in this project.' }
    //   ]
    // },
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
    { id: 11, title: 'Set environment variables on project', description: 'If you are among the best at what you do we invite you to work with us in our creative, results-oriented environment.', deliveredAt: '05/09/2022', timing: '2 hours' }
  ]
  return data
}

const ListOfTasks = async (): Promise<JSX.Element> => {
  const tasks = await fetchTasks()

  return (
    <>
      <MasonryGrid>
        {(tasks[0].stats != null) && <ProjectStats stats={tasks[0].stats} />}
        {tasks.splice(1).map((task, index) => (
          <div key={index} className='relative flex flex-col items-start bg-gray-200 group p-7 dark:bg-white rounded-3xl'>
            <h3 className='mb-5 text-3xl font-bold font-primaryFont'>{task.title}</h3>
            <Paragraph variant='sm'>{task.description}</Paragraph>
            <div className='flex flex-wrap gap-3 mt-4'>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><CalendarIcon className='w-4 stroke-width-2' /> {task.deliveredAt}</div>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><ClockIcon className='w-4 stroke-width-2' /> {task.timing}</div>
            </div>
            <div className='absolute left-0 flex justify-center w-full transition ease-in-out opacity-100 duration-400 -top-4 xl:opacity-0 gap-x-3 group-hover:opacity-100'>
              <div className='flex items-center h-8 px-4 text-black transition ease-in-out rounded-full cursor-pointer duration-400 bg-custom-yellow hover:text-white hover:bg-black'><PencilSquareIcon className='w-4 stroke-width-2' /></div>
              <div className='flex items-center h-8 px-4 text-black transition ease-in-out rounded-full cursor-pointer duration-400 bg-custom-red hover:text-white hover:bg-black'><TrashIcon className='w-4 stroke-width-2' /></div>
            </div>
          </div>
        ))}
      </MasonryGrid>
    </>
  )
}

export default ListOfTasks
