import { Transition } from '@headlessui/react'

export default function Modal ({ children, dependency }: { children: React.ReactNode, dependency: boolean }): JSX.Element {
  return (
    <Transition
      className='fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full'
      show={dependency}
      enter='transition duration-500 ease-in-out'
      enterFrom='opacity-0 invisible'
      enterTo='opacity-100 visible'
      leave='transition duration-500 ease-in-out'
      leaveFrom='opacity-100 visible'
      leaveTo='opacity-0 invisible'
    >
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-95' />
      <Transition.Child
        enter='transition delay-150 duration-500 ease-in-out'
        enterFrom='opacity-0 translate-y-32'
        enterTo='opacity-100 translate-y-0'
        leave='transition delay-150 duration-500 ease-in-out'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-32'
      >
        <div className='z-20'>{children}</div>
      </Transition.Child>
    </Transition>
  )
}
