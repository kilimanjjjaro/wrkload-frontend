import { useContext } from 'react'
import Modal from 'app/components/shared/Modal'
import AddTask from 'app/components/tasks/AddTask'
import UpdateTask from 'app/components/tasks/UpdateTask'
import DeleteTask from 'app/components/tasks/DeleteTask'
import SearchForm from 'app/components/shared/SearchForm'

import { DataContext } from 'context/DataContext'

export default function Modals (): JSX.Element {
  const { addTaskModalStatus, setAddTaskModalStatus, updateTaskModalStatus, setUpdateTaskModalStatus, deleteTaskModalStatus, setDeleteTaskModalStatus, searchModalStatus, setSearchModalStatus } = useContext(DataContext)

  return (
    <>
      <Modal modalStatus={updateTaskModalStatus} setModalStatus={setUpdateTaskModalStatus}>
        <UpdateTask />
      </Modal>

      <Modal modalStatus={deleteTaskModalStatus} setModalStatus={setDeleteTaskModalStatus}>
        <DeleteTask />
      </Modal>

      <Modal modalStatus={addTaskModalStatus} setModalStatus={setAddTaskModalStatus}>
        <AddTask />
      </Modal>

      <Modal modalStatus={searchModalStatus} setModalStatus={setSearchModalStatus}>
        <SearchForm type='task' setModalStatus={setSearchModalStatus} />
      </Modal>
    </>
  )
}
