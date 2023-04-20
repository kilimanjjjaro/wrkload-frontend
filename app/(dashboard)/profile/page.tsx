'use client'

import { useContext, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AvatarEditor from 'react-avatar-editor'
import axios from 'axios'
import { toast } from 'sonner'
import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'
import { LockClosedIcon, UserMinusIcon, CloudArrowUpIcon, PencilSquareIcon, CheckIcon, ShieldExclamationIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import PageTransition from 'components/shared/PageTransition'
import Button from 'components/shared/Button'
import Paragraph from 'components/shared/Paragraph'
import { AppContext } from 'contexts/AppContext'
import { updateAvatar } from 'services/users/updateAvatar'
import { ALLOWED_IMAGE_SIZE, ALLOWED_IMAGE_MIME_TYPES } from 'constants/components'

export default function Profile (): JSX.Element {
  const { user, setUser, setIsLoggingIn } = useContext(AppContext)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const editor = useRef<AvatarEditor>(null)
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]

    if (file != null) {
      try {
        if (file.size > ALLOWED_IMAGE_SIZE) throw new Error('The file size is too large. Please select an image with a maximum size of 5MB.')

        if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) throw new Error('This file type is not allowed. Please select an image (jpg, jpeg, png, webp).')

        setAvatar(file)
      } catch (error: any) {
        toast(
          <>
            <ShieldExclamationIcon className='w-5 stroke-blue stroke-3' />
            <p><Balancer>{error.message}</Balancer></p>
          </>
        )
      }
    }
  }

  const handleSubmit = async (): Promise<void> => {
    if (editor.current !== null) {
      setIsLoggingIn(true)
      setIsLoading(true)
      const canvas = editor.current.getImage()
      const file = canvas.toDataURL('image/jpeg')

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'wrkload-avatar')
      formData.append('folder', 'wrkload/avatars')

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dfzzgyj7r/image/upload',
          formData,
          {
            withCredentials: false
          }
        )

        const croppedImage = response.data.eager[0].secure_url

        const updatedUser = await updateAvatar({ avatar: croppedImage })

        setUser(updatedUser)

        toast(
          <>
            <CheckCircleIcon className='w-5 stroke-blue stroke-3' />
            <p><Balancer>Avatar updated successfully!</Balancer></p>
          </>
        )
      } catch (error) {
        toast(
          <>
            <ShieldExclamationIcon className='w-5 stroke-blue stroke-3' />
            <p>Something went wrong. Please, try again!</p>
          </>
        )
      } finally {
        setIsLoading(false)
        setIsLoggingIn(false)
        setAvatar(null)
      }
    }
  }

  return (
    <PageTransition>
      <Headline className='font-bold text-blue' variant='lg'>
        Profile
      </Headline>
      {(user !== null) && (
        <div className='flex flex-col gap-10 xl:w-1/2'>
          <div className='flex flex-col items-start gap-4'>
            <Headline className='!mb-0 dark:text-white' variant='md'>Avatar</Headline>
            <div className='relative flex items-center justify-center'>
              {avatar === null && (
                <Image
                  className='object-cover transition-all ease-in-out bg-black border-[6px] border-black rounded-full duration-400 dark:bg-white dark:border-white'
                  src={user.avatar}
                  alt={user.username}
                  width={200}
                  height={200}
                  priority
                />
              )}
              {avatar !== null && (
                <div className='relative group rounded-full transition-all ease-in-out duration-400 bg-white border-[6px] border-black dark:bg-black dark:border-white dark:border-dashed flex justify-center items-center'>
                  <AvatarEditor
                    className={clsx(
                      'rounded-full opacity-20 group-hover:opacity-100 transition-opacity ease-in-out duration-400',
                      isLoading && 'animate-pulse'
                    )}
                    ref={editor}
                    image={avatar}
                    width={200}
                    height={200}
                    border={0}
                    borderRadius={200}
                  />
                  <svg className='absolute transition-all ease-in-out w-14 h-14 group-hover:opacity-0 duration-400 group-hover:invisible' viewBox='0 0 21 21' xmlns='http://www.w3.org/2000/svg'><g fill='none' fillRule='evenodd' stroke='#fff' strokeLinecap='round' strokeLinejoin='round' transform='translate(4 4)'><path d='m5.5 3.5h4v4' /><path d='m9.5 9.5v3' /><path d='m3.5 3.5h-3.5' /><path d='m3.5.5v9h9' /></g></svg>
                </div>
              )}
              <div className='absolute flex items-center justify-center w-10 h-10 transition ease-in-out scale-95 rounded-full cursor-pointer will-change-transform bg-blue bottom-3 right-3 group hover:bg-black dark:hover:bg-white duration-400 hover:scale-100'>
                {avatar === null && (
                  <>
                    <label aria-label='Upload avatar' htmlFor='upload-avatar'><CloudArrowUpIcon className='w-5 transition ease-in-out cursor-pointer stroke-2 duration-400 stroke-black group-hover:stroke-blue dark:group-hover:stroke-black' /></label>
                    <input className='hidden' type='file' name='avatar' id='upload-avatar' accept='image/png, image/jpeg, image/webp' onChange={handleChange} />
                  </>
                )}
                {avatar !== null && (
                  <button aria-label='Save avatar' className='text-white' onClick={() => { void handleSubmit() }}><CheckIcon className='w-5 transition ease-in-out stroke-2 duration-400 stroke-black group-hover:stroke-blue dark:group-hover:stroke-black' /></button>
                )}
              </div>
            </div>
            <Paragraph className='dark:text-white' variant='sm'><Balancer>You can upload an image in jpg, jpeg, png or webp format and its size cannot be larger than 5 MB. The recommended resolution is 256x256px.</Balancer></Paragraph>
          </div>

          <div className='flex flex-col gap-4 dark:text-white'>
            <Headline className='!mb-0' variant='md'>Name</Headline>
            <Paragraph variant='normal'>{user.username}</Paragraph>
          </div>

          <div className='flex flex-col gap-4 dark:text-white'>
            <Headline className='!mb-0' variant='md'>Email</Headline>
            <Paragraph variant='normal'>{user.email}</Paragraph>
          </div>

          <div className='flex flex-col items-start gap-4'>
            <div className='relative flex justify-center group'>
              <Button className='!w-auto' variant='primary'><PencilSquareIcon className='w-4 stroke-3' /> Update profile</Button>
              <div className='absolute invisible opacity-100 md:opacity-0 tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out top-8 bg-light-blue duration-400 group-hover:opacity-100 group-hover:visible rounded-full'>
                Coming soon
              </div>
            </div>
            <Button className='!w-auto' variant='primary' onClick={() => router.push('/change-password')}><LockClosedIcon className='w-4 stroke-3' /> Change password</Button>
            <Button className='!w-auto' variant='primary' onClick={() => router.push('/delete-account')}><UserMinusIcon className='w-4 stroke-3' /> Delete account</Button>
          </div>
        </div>
      )}
    </PageTransition>
  )
}
