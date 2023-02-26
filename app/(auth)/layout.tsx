import type { ChildrenInterface } from 'interfaces/components'

export const metadata = {
  title: { default: 'login', template: '%s | wrkload' }
}

export default function AuthLayout ({ children }: ChildrenInterface): JSX.Element {
  return (
    <main className='px-[5vw] flex items-center justify-center h-screen'>
      {children}
    </main>
  )
}
