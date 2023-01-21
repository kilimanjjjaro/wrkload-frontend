'use client'

import { useState } from 'react'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import User from 'app/(dashboard)/users/components/User'
import Modal from 'app/components/shared/Modal'
import UpdateUser from 'app/(dashboard)/users/components/UpdateUser'
import DeleteUser from 'app/(dashboard)/users/components/DeleteUser'
import { UserInterface } from 'interfaces/users/User'

import { INITIAL_USER_STATE, USERS } from 'constants/users'

export default function Users (): JSX.Element {
  const [updateModalStatus, setUpdateModalStatus] = useState(false)
  const [deleteModalStatus, setDeleteModalStatus] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserInterface>(INITIAL_USER_STATE)

  return (
    <>
      <MasonryGrid>
        {USERS?.map((user: UserInterface) => (
          <User key={user._id} user={user} setUpdateModalStatus={setUpdateModalStatus} setDeleteModalStatus={setDeleteModalStatus} setSelectedUser={setSelectedUser} />
        ))}
      </MasonryGrid>

      <Modal modalStatus={updateModalStatus} setModalStatus={setUpdateModalStatus}>
        <UpdateUser data={selectedUser} setModalStatus={setUpdateModalStatus} />
      </Modal>

      <Modal modalStatus={deleteModalStatus} setModalStatus={setDeleteModalStatus}>
        <DeleteUser data={selectedUser} setModalStatus={setDeleteModalStatus} />
      </Modal>
    </>
  )
}
