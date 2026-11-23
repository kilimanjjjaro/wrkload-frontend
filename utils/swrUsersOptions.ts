import type { MutatorOptions } from 'swr'
import { sortUsers } from 'utils/sortData'

import type { FullUserInterface, UserInterface } from 'interfaces/users/User'

export const updateUserOptions = (updatedUser: UserInterface): MutatorOptions => ({
    optimisticData: (data: FullUserInterface) => {
      const prevUsers = data.users.filter(user => user._id !== updatedUser._id)
      return { ...data, users: sortUsers([...prevUsers, updatedUser]) }
    },
    rollbackOnError: true,
    populateCache: (updated: UserInterface, data: FullUserInterface) => {
      const prevUsers = data.users.filter(user => user._id !== updatedUser._id)
      return { ...data, users: sortUsers([...prevUsers, updated]) }
    }
  })

export const deleteUserOptions = (_id: string): MutatorOptions => ({
    optimisticData: (data: FullUserInterface) => ({
        ...data,
        users: data.users.filter(user => user._id !== _id)
      }),
    rollbackOnError: true,
    populateCache: (_: null, data: FullUserInterface) => ({
        ...data,
        users: data.users.filter(user => user._id !== _id)
      })
  })
