import clsx from 'clsx'
import PageTitle from 'components/tasks/PageTitle'
import Options from 'components/tasks/Options'

interface Props {
  shouldRenderOptions: boolean
}

export default function Header ({ shouldRenderOptions }: Props): JSX.Element {
  return (
    <header className={clsx(
      'flex flex-col md:flex-row text-black dark:text-blue mb-10 gap-y-10',
      !shouldRenderOptions && 'justify-between',
      shouldRenderOptions && 'justify-center'
    )}
    >
      <PageTitle />
      {!shouldRenderOptions && <Options />}
    </header>
  )
}
