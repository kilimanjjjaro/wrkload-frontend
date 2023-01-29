import { sortTasks } from 'utils/sortData'

import type { TaskInterface } from 'interfaces/tasks/Task'

export const addTaskOptions = (newTask: TaskInterface): any => {
  return {
    optimisticData: (tasks: TaskInterface[]) => sortTasks([...tasks, newTask]),
    rollbackOnError: true,
    populateCache: (added: TaskInterface, tasks: TaskInterface[]) => sortTasks([...tasks, added]),
    revalidate: false
  }
}

export const updateTaskOptions = (updatedTask: TaskInterface): any => {
  return {
    optimisticData: (tasks: TaskInterface[]) => {
      const prevTasks = tasks.filter(task => {
        return task._id !== updatedTask._id
      })
      return sortTasks([...prevTasks, updatedTask])
    },
    rollbackOnError: true,
    populateCache: (updated: TaskInterface, tasks: TaskInterface[]) => {
      const prevTasks = tasks.filter(task => {
        return task._id !== updatedTask._id
      })
      return sortTasks([...prevTasks, updated])
    },
    revalidate: false
  }
}

export const deleteTaskOptions = (_id: string): any => {
  return {
    optimisticData: (tasks: TaskInterface[]) => {
      return tasks.filter(task => {
        return task._id !== _id
      })
    },
    rollbackOnError: true,
    populateCache: (_: null, tasks: TaskInterface[]) => {
      return tasks.filter(task => {
        return task._id !== _id
      })
    },
    revalidate: false
  }
}
