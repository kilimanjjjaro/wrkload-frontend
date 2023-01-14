'use client'

import { useState } from 'react'
import Image from 'next/image'
import Paragraph from 'app/components/shared/Paragraph'
import Modal from 'app/components/shared/Modal'
import Moment from 'moment'
import { CalendarIcon, ClockIcon, EnvelopeIcon, InboxStackIcon, PencilSquareIcon, TrashIcon, UserIcon } from '@heroicons/react/24/outline'
import { TaskInterface } from 'interfaces/tasks/Task'
import { ProjectInterface } from 'interfaces/projects/Project'
import { UserInterface } from 'interfaces/users/User'

interface DataInterface extends TaskInterface, ProjectInterface, UserInterface {}

interface Props {
  data: DataInterface
  updateData: React.ComponentType<any>
}

export default function Card ({ data, updateData: UpdateData }: Props): JSX.Element {
  const [modalStatus, setModalStatus] = useState(false)

  return (
    <div className='relative flex flex-col items-start transition ease-in-out bg-white hover:bg-white duration-400 text-dark-gray group p-7'>
      {data.avatar !== undefined && (
        <div className='relative'>
          <Image
            className='object-cover w-20 h-20 mb-4'
            src={data.avatar}
            alt={data.username}
            width='80'
            height='80'
          />
          {data.confirmationStatus === false && <div className='absolute w-3 h-3 top-1 left-1 bg-custom-red' title='Unconfirmed account' />}
        </div>
      )}

      {data.title !== undefined && <h3 className='mb-5 text-4xl font-bold font-primaryFont'>{data.title}</h3>}
      {data.name !== undefined && <h3 className='mb-5 text-4xl font-bold font-primaryFont'>{data.name}</h3>}
      {data.username !== undefined && <h3 className='mb-5 text-4xl font-bold font-primaryFont'>{data.username}</h3>}
      {data.role !== undefined && (
        <div className='flex mb-3 items-center h-6 px-2 text-[10px] font-bold text-gray-500 uppercase border-2 border-gray-500  gap-x-1 font-secondaryFont'>
          {data.role === 1 && 'Administrator'}
          {data.role === 2 && 'Project Manager'}
          {data.role === 3 && 'Partner'}
        </div>
      )}

      <Paragraph variant='sm'>{data.description}</Paragraph>

      <div className='flex flex-wrap gap-3 mt-4'>
        {data.deliveredAt !== undefined && <div className='flex items-center h-8 px-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='Delivery date'><CalendarIcon className='w-4 stroke-width-2' /> {Moment(data.deliveredAt).format('DD-MM-YYYY')}</div>}
        {data.timing !== undefined && <div className='flex items-center h-8 px-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='Timing'><ClockIcon className='w-4 stroke-width-2' /> {data.timing}</div>}
        {data.totalTasks !== undefined && <div className='flex items-center h-8 px-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='Total tasks'><InboxStackIcon className='w-4 stroke-width-2' /> {data.totalTasks}</div>}
        {data.email !== undefined && <div className='flex items-center h-8 px-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='E-mail'><EnvelopeIcon className='w-4 stroke-width-2' /> {data.email}</div>}
        {data.registeredAt !== undefined && <div className='flex items-center h-8 px-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='Registered at'><UserIcon className='w-4 stroke-width-2' /> {data.registeredAt}</div>}
      </div>

      <div className='absolute left-0 flex justify-center w-full text-xs font-semibold tracking-widest text-white uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 -top-[0.9rem] xl:opacity-0 gap-x-3 group-hover:opacity-100'>
        <div onClick={() => setModalStatus(!(modalStatus))} className='flex items-center px-[0.83rem] transition ease-in-out cursor-pointer h-7 duration-400 bg-custom-yellow hover:bg-dark-gray'><PencilSquareIcon className='w-4 stroke-width-2' /></div>
        <div className='flex items-center px-[0.83rem] transition ease-in-out cursor-pointer h-7 duration-400 bg-custom-red hover:bg-dark-gray'><TrashIcon className='w-4 stroke-width-2' /></div>
      </div>
      <Modal dependency={modalStatus} close={() => setModalStatus(!(modalStatus))}>
        <UpdateData modalStatus={modalStatus} setModalStatus={setModalStatus} data={data} />
      </Modal>
    </div>
  )
}
