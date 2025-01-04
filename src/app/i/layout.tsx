'use client';

import React, { Suspense } from 'react'
import Image from 'next/image';
import BrandBars from '@/components/BrandBars';
import { clsx } from 'clsx';
import { adminRoutes } from './_module/admin.routes';
import Header from '@/components/Header';
import AdminQueries from './_module/admin.queries';
import { appRoutes } from '../_module/app.routes';
import { Button } from '@/components/ui/button';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { useFetchAuthenticationQuery } = AdminQueries();
  const { data, isPending } = useFetchAuthenticationQuery();

  const routes = [
    { name: 'Overview', href: adminRoutes.dashboard },
    { name: 'Courses', href: adminRoutes.courses },
    { name: 'Users', href: adminRoutes.users },
    { name: 'Affiliates', href: adminRoutes.affiliates },
    { name: 'Website Content', href: adminRoutes.websiteContent.root },
    { name: 'Reports', href: adminRoutes.reports.root },
    { name: 'Settings', href: adminRoutes.settings },
  ]

  if (isPending) {
    return (
      <div className='relative w-screen min-h-screen grid place-items-center'>
        <div className='flex flex-col items-center gap-4'>
          <Image src='/logos/logo.svg' alt='The Grind Academy Logo' width={240} height={60} className={clsx('transition-opacity duration-700')} />
          <BrandBars containerClassName={clsx('w-52 animate-pulse')} barClassName="!h-12" />
        </div>
      </div>
    )
  }

  if (data?.role !== 'admin') {
    return (
      <div className='relative w-screen min-h-screen grid place-items-center'>
        <div className='flex flex-col items-center gap-4'>
          <Image src='/logos/logo.svg' alt='The Grind Academy Logo' width={240} height={60} className={clsx('transition-opacity duration-700')} />
          <p className='text-sm text-accent text-center'>
            You are not authorized to access this page
          </p>
          <Button variant='default' href={appRoutes.home}>Return to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className='relative w-screen min-h-screen space-y-6'>
      <Header routes={routes} />
      <div className='px-4 pb-4'>
        {children}
      </div>
    </div>
  )
}


export default function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <AdminLayout>
        {children}
      </AdminLayout>
    </Suspense>
  )
}
