import { useContext } from 'react'
import Modal from 'app/components/shared/Modal'
import AddProject from 'app/components/projects/AddProject'
import UpdateProject from 'app/components/projects/UpdateProject'
import DeleteProject from 'app/components/projects/DeleteProject'

import { DataContext } from 'context/DataContext'

export default function Modals (): JSX.Element {
  const { addProjectModalStatus, setAddProjectModalStatus, updateProjectModalStatus, setUpdateProjectModalStatus, deleteProjectModalStatus, setDeleteProjectModalStatus } = useContext(DataContext)

  return (
    <>
      <Modal modalStatus={updateProjectModalStatus} setModalStatus={setUpdateProjectModalStatus}>
        <UpdateProject />
      </Modal>

      <Modal modalStatus={deleteProjectModalStatus} setModalStatus={setDeleteProjectModalStatus}>
        <DeleteProject />
      </Modal>

      <Modal modalStatus={addProjectModalStatus} setModalStatus={setAddProjectModalStatus}>
        <AddProject />
      </Modal>
    </>
  )
}
