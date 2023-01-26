import clsx from 'clsx'
import PageTitle from 'app/components/tasks/PageTitle'
import Options from 'app/components/tasks/Options'

interface Props {
  shouldRenderOptions: boolean
}

export default function Header ({ shouldRenderOptions }: Props): JSX.Element {
  return (
    <header className={clsx(
      'flex text-white',
      !shouldRenderOptions && 'justify-between',
      shouldRenderOptions && 'justify-center'
    )}
    >
      <PageTitle />
      {!shouldRenderOptions && <Options />}
    </header>
  )
}
