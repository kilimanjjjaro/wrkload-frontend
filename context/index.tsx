import combineComponents from 'utils/combineComponents'
import UserProvider from 'context/UserContext'

const providers = [
  UserProvider
]

export const AppContextProvider = combineComponents(...providers)
