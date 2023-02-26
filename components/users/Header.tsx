import clsx from 'clsx'
import PageTitle from 'components/users/PageTitle'
import Options from 'components/users/Options'

interface Props {
  shouldRenderOptions: boolean
}

export default function Header ({ shouldRenderOptions }: Props): JSX.Element {
  return (
    <header className={clsx(
      'flex text-black dark:text-blue items-center transition-colors duration-400 ease-in-out',
      !shouldRenderOptions && 'justify-between',
      shouldRenderOptions && 'justify-center'
    )}
    >
      <PageTitle />
      {!shouldRenderOptions && <Options />}
    </header>
  )
}
