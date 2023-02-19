import { useContext } from 'react'
import Modal from 'components/shared/Modal'
import AddTask from 'components/tasks/AddTask'
import UpdateTask from 'components/tasks/UpdateTask'
import DeleteTask from 'components/tasks/DeleteTask'
import SearchForm from 'components/shared/SearchForm'

import { ModalsContext } from 'contexts/ModalsContext'

export default function Modals (): JSX.Element {
  const { addDataModalStatus, setAddDataModalStatus, updateDataModalStatus, setUpdateDataModalStatus, deleteDataModalStatus, setDeleteDataModalStatus, searchModalStatus, setSearchModalStatus } = useContext(ModalsContext)

  return (
    <>
      <Modal modalStatus={updateDataModalStatus} setModalStatus={setUpdateDataModalStatus}>
        <UpdateTask />
      </Modal>

      <Modal modalStatus={deleteDataModalStatus} setModalStatus={setDeleteDataModalStatus}>
        <DeleteTask />
      </Modal>

      <Modal modalStatus={addDataModalStatus} setModalStatus={setAddDataModalStatus}>
        <AddTask />
      </Modal>

      <Modal modalStatus={searchModalStatus} setModalStatus={setSearchModalStatus}>
        <SearchForm type='task' setModalStatus={setSearchModalStatus} />
      </Modal>
    </>
  )
}
