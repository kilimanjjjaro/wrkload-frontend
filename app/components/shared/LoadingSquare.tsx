export default function LoadingSquare (): JSX.Element {
  return (
    <svg width='25' height='25' viewBox='0 0 100 100'>
      <polyline points='0,0 100,0 100,100 stroke-none' stroke-width='30' fill='none' />
      <polyline points='0,0 0,100 100,100 stroke-none' stroke-width='30' fill='none' />
      <polyline className='animate-loading-square stroke-dark-gray' points='0,0 100,0 100,100' stroke-width='30' fill='none' />
      <polyline className='animate-loading-square stroke-dark-gray' points='0,0 0,100 100,100' stroke-width='30' fill='none' />
    </svg>
  )
}
