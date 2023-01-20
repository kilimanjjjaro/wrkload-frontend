'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { tasksEndpoint as key, getTasks } from 'services/tasks/tasks'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import Skeleton from 'app/components/shared/Skeleton'
import Modal from 'app/components/shared/Modal'
import Task from 'app/(dashboard)/tasks/components/Task'
import UpdateTask from 'app/(dashboard)/tasks/components/UpdateTask'
import DeleteTask from 'app/(dashboard)/tasks/components/DeleteTask'
import { TaskInterface } from 'interfaces/tasks/Task'

import { INITIAL_TASK_STATE, SKELETON } from 'constants/tasks'

export default function Tasks (): JSX.Element {
  const [updateModalStatus, setUpdateModalStatus] = useState(false)
  const [deleteModalStatus, setDeleteModalStatus] = useState(false)
  const [selectedTask, setSelectedTask] = useState<TaskInterface>(INITIAL_TASK_STATE)

  const { data: tasks, isLoading } = useSWR(key, getTasks, { onSuccess: data => data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) })

  return (
    <>
      <MasonryGrid>
        {isLoading && SKELETON.map((_, index) => (
          <Skeleton type='task' key={index} />
        ))}
        {tasks?.map((task) => (
          <Task key={task._id} task={task} setUpdateModalStatus={setUpdateModalStatus} setDeleteModalStatus={setDeleteModalStatus} setSelectedTask={setSelectedTask} />
        ))}
      </MasonryGrid>

      <Modal modalStatus={updateModalStatus} setModalStatus={setUpdateModalStatus}>
        <UpdateTask data={selectedTask} setModalStatus={setUpdateModalStatus} />
      </Modal>

      <Modal modalStatus={deleteModalStatus} setModalStatus={setDeleteModalStatus}>
        <DeleteTask data={selectedTask} setModalStatus={setDeleteModalStatus} />
      </Modal>
    </>
  )
}
