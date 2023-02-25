import clsx from 'clsx'
import PageTitle from 'components/projects/PageTitle'
import Options from 'components/projects/Options'

interface Props {
  shouldRenderOptions: boolean
}

export default function Header ({ shouldRenderOptions }: Props): JSX.Element {
  return (
    <header className={clsx(
      'flex text-blue items-center',
      !shouldRenderOptions && 'justify-between',
      shouldRenderOptions && 'justify-center'
    )}
    >
      <PageTitle />
      {!shouldRenderOptions && <Options />}
    </header>
  )
}
