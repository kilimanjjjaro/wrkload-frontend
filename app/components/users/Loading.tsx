import MasonryGrid from 'app/components/shared/MasonryGrid'
import Skeleton from 'app/components/shared/Skeleton'

import { SKELETON } from 'constants/components'

export default function Loading (): JSX.Element {
  return (
    <MasonryGrid>
      {SKELETON.map((_, index) => (
        <Skeleton type='user' key={index} />
      ))}
    </MasonryGrid>
  )
}
