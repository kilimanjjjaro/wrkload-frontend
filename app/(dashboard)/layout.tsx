import ModalsProvider from 'contexts/ModalsContext'

import type { ChildrenInterface } from 'interfaces/components'

export default function DashboardLayout ({ children }: ChildrenInterface): JSX.Element {
  return (
    <div className='px-[5vw] w-full py-40 pb-36 dark:bg-black'>
      <ModalsProvider>
        {children}
      </ModalsProvider>
    </div>
  )
}
