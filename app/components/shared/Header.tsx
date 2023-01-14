'use client'

import { usePathname } from 'next/navigation'
import { PageTitle as TasksPageTitle } from 'app/(dashboard)/tasks/components/PageTitle'
import { Options as TasksOptions } from 'app/(dashboard)/tasks/components/Options'
import { PageTitle as ProjectsPageTitle } from 'app/(dashboard)/projects/components/PageTitle'
import { Options as ProjectsOptions } from 'app/(dashboard)/projects/components/Options'
import { PageTitle as UsersPageTitle } from 'app/(dashboard)/users/components/PageTitle'
import { Options as UsersOptions } from 'app/(dashboard)/users/components/Options'

export default function Header (): JSX.Element {
  const pathName = usePathname()

  return (
    <>
      {pathName === '/tasks' &&
        <header className='flex justify-between text-white dark:text-white'>
          <TasksPageTitle />
          <TasksOptions />
        </header>}

      {pathName === '/projects' &&
        <header className='flex justify-between text-white dark:text-white'>
          <ProjectsPageTitle />
          <ProjectsOptions />
        </header>}

      {pathName === '/users' &&
        <header className='flex justify-between text-white dark:text-white'>
          <UsersPageTitle />
          <UsersOptions />
        </header>}
    </>
  )
}
