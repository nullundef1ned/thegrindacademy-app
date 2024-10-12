import React, { Fragment } from 'react'
import { Slide, ToastContainer, ToastOptions } from 'react-toastify';

type ToastProviderProps = {
  children: React.ReactNode
}

const options: ToastOptions = {
  theme: 'colored',
  draggable: true,
  autoClose: 5000,
  transition: Slide,
  pauseOnHover: true,
  closeOnClick: true,
  hideProgressBar: true,
  position: 'top-center',
}

// const contextClass = {
//   success: 'bg-green-900 border border-green-700 text-white',
//   error: 'bg-red-900 border border-red-700 text-white',
//   warning: 'bg-yellow-900 border border-yellow-700 text-white',
//   info: 'bg-blue-900 border border-blue-700 text-white',
//   default: 'bg-gray-900 border border-gray-700 text-white',
// }

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <Fragment>
      {children}
      <ToastContainer {...options} />
    </Fragment>
  )
}
