import ProjectSelector from 'components/tasks/ProjectSelector'
import Options from 'components/tasks/Options'

interface Props {
  projectNames: string[]
  shouldRenderNotFound: boolean
}

export default function Header ({ projectNames, shouldRenderNotFound }: Props): JSX.Element {
  return (
    <header className='flex flex-col justify-between mb-10 text-black xl:flex-row dark:text-blue gap-y-10'>
      <h2 className='flex flex-col text-6xl md:flex-row gap-x-5 font-primaryFont'>
        <span className='transition-colors ease-in-out duration-400'>Tasks of</span>
        {projectNames.length === 0 && <div className='w-56 rounded-full bg-gradient-to-r from-white dark:from-light-blue via-blue to-light-blue dark:to-light-blue bg-[length:200%_100%] h-14 animate-skeleton' />}
        {projectNames.length >= 1 && (
          <ProjectSelector projectNames={projectNames} />
        )}
      </h2>
      {!shouldRenderNotFound && <Options />}
    </header>
  )
}
