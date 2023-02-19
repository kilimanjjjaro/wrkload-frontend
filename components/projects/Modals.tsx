import { useContext } from 'react'
import Modal from 'components/shared/Modal'
import AddProject from 'components/projects/AddProject'
import UpdateProject from 'components/projects/UpdateProject'
import DeleteProject from 'components/projects/DeleteProject'
import SearchForm from 'components/shared/SearchForm'

import { ModalsContext } from 'contexts/ModalsContext'

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
