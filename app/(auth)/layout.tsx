import type { ChildrenInterface } from 'interfaces/components'

export default function AuthLayout ({ children }: ChildrenInterface): JSX.Element {
  return (
    <main className='p-6 md:px-[5vw] flex items-center justify-center h-screen'>
      {children}
    </main>
  )
}
