import clsx from 'clsx'
import PageTitle from 'components/projects/PageTitle'
import Options from 'components/projects/Options'

interface Props {
  shouldRenderOptions: boolean
}

export default function Header ({ shouldRenderOptions }: Props): JSX.Element {
  return (
    <header className={clsx(
      'flex flex-col md:flex-row text-black dark:text-blue mb-10 md:mb-0 transition-colors duration-400 ease-in-out',
      !shouldRenderOptions && 'justify-between',
      shouldRenderOptions && 'justify-center'
    )}
    >
      <PageTitle />
      {!shouldRenderOptions && <Options />}
    </header>
  )
}
