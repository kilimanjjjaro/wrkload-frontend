import { useContext } from 'react'
import Modal from 'components/shared/Modal'
import UpdateUser from 'components/users/UpdateUser'
import DeleteUser from 'components/users/DeleteUser'
import SearchForm from 'components/shared/SearchForm'
import { ModalsContext } from 'contexts/ModalsContext'

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
