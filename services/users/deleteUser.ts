import privateApi from 'utils/privateApi'

import { USERS_ENDPOINT } from 'constants/users'

export const deleteUser = async (_id: string): Promise<any> => {
  const response = await privateApi.delete(`${USERS_ENDPOINT}/${_id}`)

  return response.data
}
