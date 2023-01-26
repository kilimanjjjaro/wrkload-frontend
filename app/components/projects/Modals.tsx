import { useContext } from 'react'
import Modal from 'app/components/shared/Modal'
import AddProject from 'app/components/projects/AddProject'
import UpdateProject from 'app/components/projects/UpdateProject'
import DeleteProject from 'app/components/projects/DeleteProject'
import SearchForm from 'app/components/shared/SearchForm'

import { ModalsContext } from 'context/ModalsContext'

export default function Modals (): JSX.Element {
  const { addDataModalStatus, setAddDataModalStatus, updateDataModalStatus, setUpdateDataModalStatus, deleteDataModalStatus, setDeleteDataModalStatus, searchModalStatus, setSearchModalStatus } = useContext(ModalsContext)

  return (
    <>
      <Modal modalStatus={updateDataModalStatus} setModalStatus={setUpdateDataModalStatus}>
        <UpdateProject />
      </Modal>

      <Modal modalStatus={deleteDataModalStatus} setModalStatus={setDeleteDataModalStatus}>
        <DeleteProject />
      </Modal>

      <Modal modalStatus={addDataModalStatus} setModalStatus={setAddDataModalStatus}>
        <AddProject />
      </Modal>

      <Modal modalStatus={searchModalStatus} setModalStatus={setSearchModalStatus}>
        <SearchForm type='project' setModalStatus={setSearchModalStatus} />
      </Modal>
    </>
  )
}
