'use client'

import { Plock, Breakpoint } from 'react-plock'
import Pagination from '../components/shared/Pagination'
import Task from './components/Task'

const TASKS = [
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

const breakpoints: Breakpoint[] = [
  { size: 640, columns: 1 },
  { size: 768, columns: 2 },
  { size: 1280, columns: 4 }
]

export default function Tasks (): JSX.Element {
  return (
    <section>
      <Plock breakpoints={breakpoints} gap='2.5rem'>
        {TASKS.map((task) => (
          <Task key={task.id} title={task.title} description={task.description} deliveredAt={task.deliveredAt} timing={task.timing} />
        ))}
      </Plock>
      <Pagination />
    </section>
  )
}
