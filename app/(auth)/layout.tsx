interface Props {
  children: React.ReactNode
}

export default function AuthLayout ({ children }: Props): JSX.Element {
  return (
    <main className='px-[5vw] flex items-center justify-center h-screen'>
      {children}
    </main>
  )
}
