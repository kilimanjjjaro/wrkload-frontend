'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { getUsers } from 'services/users/getUsers'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import User from 'app/(dashboard)/users/components/User'
import Skeleton from 'app/components/shared/Skeleton'
import Modal from 'app/components/shared/Modal'
import UpdateUser from 'app/(dashboard)/users/components/UpdateUser'
import DeleteUser from 'app/(dashboard)/users/components/DeleteUser'

import type { UserInterface } from 'interfaces/users/User'
import { SKELETON } from 'constants/components'
import { INITIAL_USER_STATE, USERS_ENDPOINT as key } from 'constants/users'

export default function Users (): JSX.Element {
  const [updateModalStatus, setUpdateModalStatus] = useState(false)
  const [deleteModalStatus, setDeleteModalStatus] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserInterface>(INITIAL_USER_STATE)

  const { data: users, isLoading } = useSWR(key, getUsers, { onSuccess: data => data.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()) })

  return (
    <>
      <MasonryGrid>
        {isLoading && SKELETON.map((_, index) => (
          <Skeleton type='user' key={index} />
        ))}
        {error === undefined && users?.map((user: UserInterface) => (
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
