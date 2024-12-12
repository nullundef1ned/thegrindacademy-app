'use client';

import React, { Suspense } from 'react'
import Header from './_components/Header';
import { studentRoutes } from './_module/student.routes';
import { useStudentStore } from './_module/student.store';
import Banner from './(overview)/_components/Banner';

function StudentLayout({ children }: { children: React.ReactNode }) {
  const banners = useStudentStore((state) => state.banners);

  const routes = [
    { name: 'Overview', href: studentRoutes.overview },
    { name: 'Courses', href: studentRoutes.courses },
    { name: 'Referrals', href: studentRoutes.referrals },
    { name: 'Support', href: studentRoutes.support },
  ]

  return (
    <div className='relative w-screen min-h-screen space-y-6'>
      <Header routes={routes} />
      {banners.length > 0 && (
        <div className='px-4 w-full sticky top-36 z-40 bg-background flex flex-col gap-4'>
          {banners.map((banner, index) => (
            <Banner banner={banner} key={index} />
          ))}
        </div>
      )}
      <div className='px-4 pb-4'>
        {children}
      </div>
    </div>
  )
}


export default function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <StudentLayout>
        {children}
      </StudentLayout>
    </Suspense>
  )
}
