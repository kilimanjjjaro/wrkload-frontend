import type { MutatorOptions } from 'swr'
import { sortTasks } from 'utils/sortData'

import type { TaskInterface, FullTaskInterface } from 'interfaces/tasks/Task'

export const addTaskOptions = (newTask: TaskInterface): MutatorOptions => ({
    optimisticData: (data: FullTaskInterface) => ({ ...data, tasks: sortTasks([...data.tasks, newTask]) }),
    rollbackOnError: true,
    populateCache: (added: TaskInterface, data: FullTaskInterface) => ({ ...data, tasks: sortTasks([...data.tasks, added]) })
  })

export const updateTaskOptions = (updatedTask: TaskInterface): MutatorOptions => ({
    optimisticData: (data: FullTaskInterface) => {
      const prevTasks = data.tasks.filter(task => task._id !== updatedTask._id)
      return { ...data, tasks: sortTasks([...prevTasks, updatedTask]) }
    },
    rollbackOnError: true,
    populateCache: (updated: TaskInterface, data: FullTaskInterface) => {
      const prevTasks = data.tasks.filter(task => task._id !== updatedTask._id)
      return { ...data, tasks: sortTasks([...prevTasks, updated]) }
    }
  })

export const deleteTaskOptions = (_id: string): MutatorOptions => ({
    optimisticData: (data: FullTaskInterface) => ({
        ...data,
        tasks: data.tasks.filter(task => task._id !== _id)
      }),
    rollbackOnError: true,
    populateCache: (_: null, data: FullTaskInterface) => ({
        ...data,
        tasks: data.tasks.filter(task => task._id !== _id)
      })
  })
