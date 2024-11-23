import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface ProfileSectionProps {
  title: string
  description: string
  hideBorder?: boolean
  children: ReactNode
}

export default function ProfileSection({ title, description, hideBorder = false, children }: ProfileSectionProps) {
  return (
    <div className={clsx('w-full grid grid-cols-1 lg:grid-cols-5 gap-10 py-10', !hideBorder && 'border-b border-[#B0CAFF1A]')}>
      <div className='space-y-2 lg:col-span-2'>
        <p className='text-xl font-semibold'>{title}</p>
        <p className='text-accent text-sm'>{description}</p>
      </div>
      <div className='space-y-6 lg:col-span-3 w-full max-w-sm'>
        {children}
      </div>
    </div>
  )
}
