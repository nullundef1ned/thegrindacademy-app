'use client';

import React from 'react'
import Header from './_components/Header';
import { studentRoutes } from './_module/student.routes';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const routes = [
    { name: 'Overview', href: studentRoutes.overview },
    { name: 'Courses', href: studentRoutes.courses },
    { name: 'Referrals', href: studentRoutes.referrals },
    { name: 'Support', href: studentRoutes.support },
  ]

  return (
    <div className='relative w-screen min-h-screen space-y-6'>
      <Header routes={routes} />
      <div className='px-4 pb-4'>
        {children}
      </div>
    </div>
  )
}
