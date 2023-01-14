import Card from 'app/components/shared/Card'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import { ProjectInterface } from 'interfaces/projects/Project'
import UpdateProject from './components/UpdateProject'

const PROJECTS = [
  { _id: 1, name: 'Vercel', createdAt: '05/09/2022', totalTasks: '5 tasks' },
  { _id: 2, name: 'Apple', createdAt: '05/09/2022', totalTasks: '15 tasks' },
  { _id: 3, name: 'MSI', createdAt: '05/09/2022', totalTasks: '2 tasks' },
  { _id: 4, name: 'Figma', createdAt: '05/09/2022', totalTasks: '4 tasks' },
  { _id: 5, name: 'Vercel', createdAt: '05/09/2022', totalTasks: '5 tasks' },
  { _id: 6, name: 'Apple', createdAt: '05/09/2022', totalTasks: '3 tasks' },
  { _id: 7, name: 'MSI', createdAt: '05/09/2022', totalTasks: '2 tasks' },
  { _id: 8, name: 'Figma', createdAt: '05/09/2022', totalTasks: '23 tasks' }
]

export default function Projects (): JSX.Element {
  return (
    <>
      <MasonryGrid>
        {PROJECTS?.map((project: ProjectInterface) => (
          <Card key={project._id} data={project} updateData={UpdateProject} />
        ))}
      </MasonryGrid>
    </>
  )
}
