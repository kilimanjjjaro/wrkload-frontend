import { useContext } from 'react'
import Modal from 'app/components/shared/Modal'
import UpdateUser from 'app/components/users/UpdateUser'
import DeleteUser from 'app/components/users/DeleteUser'

import { DataContext } from 'context/DataContext'

export default function Modals (): JSX.Element {
  const { updateUserModalStatus, setUpdateUserModalStatus, deleteUserModalStatus, setDeleteUserModalStatus } = useContext(DataContext)

  return (
    <>
      <Modal modalStatus={updateUserModalStatus} setModalStatus={setUpdateUserModalStatus}>
        <UpdateUser />
      </Modal>

      <Modal modalStatus={deleteUserModalStatus} setModalStatus={setDeleteUserModalStatus}>
        <DeleteUser />
      </Modal>
    </>
  )
}
