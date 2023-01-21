'use client'

import { useState } from 'react'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import Project from 'app/(dashboard)/projects/components/Project'
import Modal from 'app/components/shared/Modal'
import UpdateProject from 'app/(dashboard)/projects/components/UpdateProject'
import DeleteProject from 'app/(dashboard)/projects/components/DeleteProject'
import { ProjectInterface } from 'interfaces/projects/Project'

import { INITIAL_PROJECT_STATE, PROJECTS } from 'constants/projects'

export default function Projects (): JSX.Element {
  const [updateModalStatus, setUpdateModalStatus] = useState(false)
  const [deleteModalStatus, setDeleteModalStatus] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(INITIAL_PROJECT_STATE)

  return (
    <>
      <MasonryGrid>
        {PROJECTS?.map((project) => (
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
