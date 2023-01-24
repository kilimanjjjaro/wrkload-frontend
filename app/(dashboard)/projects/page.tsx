'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { getProjects } from 'services/projects/getProjects'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import Skeleton from 'app/components/shared/Skeleton'
import Modal from 'app/components/shared/Modal'
import Project from 'app/(dashboard)/projects/components/Project'
import UpdateProject from 'app/(dashboard)/projects/components/UpdateProject'
import DeleteProject from 'app/(dashboard)/projects/components/DeleteProject'

import type { ProjectInterface } from 'interfaces/projects/Project'
import { INITIAL_PROJECT_STATE, PROJECTS_ENDPOINT as key } from 'constants/projects'
import { SKELETON } from 'constants/components'

export default function Projects (): JSX.Element {
  const [updateModalStatus, setUpdateModalStatus] = useState(false)
  const [deleteModalStatus, setDeleteModalStatus] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(INITIAL_PROJECT_STATE)

  const { data: projects, isLoading, error } = useSWR(key, getProjects, { onSuccess: data => data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) })

  if (error?.response.data.code === 'projects/projects-not-found') return <div>Projects not found</div>

  console.log(error)

  return (
    <>
      <MasonryGrid>
        {isLoading && SKELETON.map((_, index) => (
          <Skeleton type='project' key={index} />
        ))}
        {error === undefined && projects?.map((project) => (
          <Project key={project._id} project={project} setUpdateModalStatus={setUpdateModalStatus} setDeleteModalStatus={setDeleteModalStatus} setSelectedProject={setSelectedProject} />
        ))}
      </MasonryGrid>

      <Modal modalStatus={updateModalStatus} setModalStatus={setUpdateModalStatus}>
        <UpdateProject data={selectedProject} setModalStatus={setUpdateModalStatus} />
      </Modal>

      <Modal modalStatus={deleteModalStatus} setModalStatus={setDeleteModalStatus}>
        <DeleteProject data={selectedProject} setModalStatus={setDeleteModalStatus} />
      </Modal>
    </>
  )
}
