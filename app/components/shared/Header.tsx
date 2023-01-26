'use client'

import { usePathname } from 'next/navigation'
import { PageTitle as TasksPageTitle } from 'app/components/tasks/PageTitle'
import { Options as TasksOptions } from 'app/components/tasks/Options'
import { PageTitle as ProjectsPageTitle } from 'app/components/projects/PageTitle'
import { Options as ProjectsOptions } from 'app/components/projects/Options'
import { PageTitle as UsersPageTitle } from 'app/components/users/PageTitle'
import { Options as UsersOptions } from 'app/components/users/Options'

export default function Header (): JSX.Element {
  const pathName = usePathname()

  return (
    <>
      {pathName === '/tasks' &&
        <header className='flex justify-between text-white'>
          <TasksPageTitle />
          <TasksOptions />
        </header>}

      {pathName === '/users' &&
        <header className='flex justify-between text-white'>
          <UsersPageTitle />
          <UsersOptions />
        </header>}
    </>
  )
}
