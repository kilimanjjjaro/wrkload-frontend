import PageTitle from 'app/tasks/components/PageTitle'
import Options from 'app/tasks/components/Options'

interface Props {
  children: React.ReactNode
}

export default function TasksLayout ({ children }: Props): JSX.Element {
  return (
    <>
      <header className='container flex justify-between px-6 mx-auto md:px-8 pt-7 md:pt-16 dark:text-white'>
        <PageTitle />
        <Options />
      </header>
      <main className='container px-6 pb-24 mx-auto md:px-8 md:pb-28'>
        {children}
      </main>
    </>
  )
}
