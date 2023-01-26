import { useContext } from 'react'
import Modal from 'app/components/shared/Modal'
import UpdateUser from 'app/components/users/UpdateUser'
import DeleteUser from 'app/components/users/DeleteUser'
import SearchForm from 'app/components/shared/SearchForm'

import { ModalsContext } from 'context/ModalsContext'

export default function Modals (): JSX.Element {
  const { updateDataModalStatus, setUpdateDataModalStatus, deleteDataModalStatus, setDeleteDataModalStatus, searchModalStatus, setSearchModalStatus } = useContext(ModalsContext)

  return (
    <>
      <Modal modalStatus={updateDataModalStatus} setModalStatus={setUpdateDataModalStatus}>
        <UpdateUser />
      </Modal>

      <Modal modalStatus={deleteDataModalStatus} setModalStatus={setDeleteDataModalStatus}>
        <DeleteUser />
      </Modal>

      <Modal modalStatus={searchModalStatus} setModalStatus={setSearchModalStatus}>
        <SearchForm type='user' setModalStatus={setSearchModalStatus} />
      </Modal>
    </>
  )
}
