import { sortUsers } from 'utils/sortData'

import type { UserInterface } from 'interfaces/users/User'

export const updateUserOptions = (updatedUser: UserInterface): any => {
  return {
    optimisticData: (users: UserInterface[]) => {
      const prevUsers = users.filter(user => {
        return user._id !== updatedUser._id
      })
      return sortUsers([...prevUsers, updatedUser])
    },
    rollbackOnError: true,
    populateCache: (updated: UserInterface, users: UserInterface[]) => {
      const prevUsers = users.filter(user => {
        return user._id !== updatedUser._id
      })
      return sortUsers([...prevUsers, updated])
    },
    revalidate: false
  }
}

export const deleteUserOptions = (_id: string): any => {
  return {
    optimisticData: (users: UserInterface[]) => {
      return users.filter(user => {
        return user._id !== _id
      })
    },
    rollbackOnError: true,
    populateCache: (_: null, users: UserInterface[]) => {
      return users.filter(user => {
        return user._id !== _id
      })
    },
    revalidate: false
  }
}
