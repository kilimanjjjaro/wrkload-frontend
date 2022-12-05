import { TasksProvider } from 'context/TasksProvider'
import { UsersProvider } from 'context/UsersProvider'
import combineComponents from 'utils/combineComponents'

const providers = [
  TasksProvider,
  UsersProvider
]

export const AppContextProvider = combineComponents(...providers)
