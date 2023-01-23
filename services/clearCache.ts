import { mutate } from 'swr'

export const clearCache = async (): Promise<void> => {
  await mutate(() => true, undefined, { revalidate: false })
}
