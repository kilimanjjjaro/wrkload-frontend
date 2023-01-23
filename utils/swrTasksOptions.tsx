import { TaskInterface } from 'interfaces/tasks/Task'

export const addTaskOptions = (newTask: TaskInterface): any => {
  return {
    optimisticData: (tasks: TaskInterface[]) => [...tasks, newTask]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    rollbackOnError: true,
    populateCache: (added: TaskInterface, tasks: TaskInterface[]) => [...tasks, added]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    revalidate: false
  }
}

export const updateTaskOptions = (updatedTask: TaskInterface): any => {
  return {
    optimisticData: (tasks: TaskInterface[]) => {
      const prevTasks = tasks.filter(task => {
        return task._id !== updatedTask._id
      })
      return [...prevTasks, updatedTask]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    },
    rollbackOnError: true,
    populateCache: (updated: TaskInterface, tasks: TaskInterface[]) => {
      const prevTasks = tasks.filter(task => {
        return task._id !== updatedTask._id
      })
      return [...prevTasks, updated]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
