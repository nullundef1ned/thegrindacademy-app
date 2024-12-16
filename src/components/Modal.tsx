import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';
import IconifyIcon from './IconifyIcon';
import { useModal } from '@/providers/modal.provider';

type ModalProps = {
  title?: string;
  rounded?: boolean;
  className?: string;
  height?: 'max' | 'full';
  children: React.ReactNode;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  position?: 'top' | 'top-left' | 'left' | 'bottom-left' | 'center' | 'bottom-center' | 'bottom-right' | 'right' | 'top-right' | 'top-center';
}

export default function Modal({ title, className, rounded, width, height, position, children }: ModalProps) {
  const { hideModal } = useModal();

  const modalWidth = {
    'xs': 'max-w-[340px]',
    'sm': 'max-w-[420px]',
    'md': 'max-w-[488px]',
    'lg': 'max-w-[1024px]',
    'xl': 'max-w-[1280px]',
    '2xl': 'max-w-[1536px]',
    '3xl': 'max-w-[1792px]',
    'full': 'w-screen',
  }[width || 'md'];

  const modalHeight = {
    'max': 'h-max',
    'full': 'h-screen',
  }[height || 'max'];

  const modalPosition = {
    'top': 'items-start justify-center',
    'top-left': 'items-start justify-start',
    'left': 'items-center justify-start',
    'bottom-left': 'items-end justify-start',
    'center': 'items-center justify-center',
    'bottom-center': 'items-end justify-center',
    'bottom-right': 'items-end justify-end',
    'right': 'items-center justify-end',
    'top-right': 'items-start justify-end',
    'top-center': 'items-start justify-center',
  }[position || 'center'];

  return ReactDOM.createPortal(
    <div className={clsx(modalPosition, 'fixed flex inset-0 z-50 p-4')}>
      <div onClick={hideModal} className="absolute z-30 w-screen h-screen bg-black bg-opacity-50" />
      <div className={clsx(className, modalWidth, modalHeight, rounded && 'rounded-lg', 'border border-[#26345F] bg-[#0D1221] p-5 w-full transition-all duration-300 flex flex-col space-y-4 z-40')}>
        <div className="flex items-center justify-between">
          {title && <p className='text-lg font-semibold'>{title}</p>}
          <div onClick={hideModal} className='!ml-auto'>
            <IconifyIcon className='cursor-pointer size-5 flex-shrink-0 flex items-center ' icon="jam:close-circle" />
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}
