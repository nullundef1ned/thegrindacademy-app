'use client';

import React, { Suspense, useEffect } from 'react'
import Header from '../../components/Header';
import { studentRoutes } from './_module/student.routes';
import { useStudentStore } from './_module/student.store';
import Banner from './(overview)/_components/Banner';
import StudentQueries from './_module/student.queries';
import Image from 'next/image';
import BrandBars from '@/components/BrandBars';
import { clsx } from 'clsx';
import { appRoutes } from '../_module/app.routes';
import storageUtil, { StorageKey } from '@/utils/storage.util';
import { adminRoutes } from '../i/_module/admin.routes';
import { IUser } from '../_module/app.interface';
import { useRouter } from 'next/navigation';

function StudentLayout({ children }: { children: React.ReactNode }) {
  const banners = useStudentStore((state) => state.banners);

  const router = useRouter();
  const { useFetchAuthenticationQuery } = StudentQueries();
  // const { data: subscription } = useFetchSubscriptionQuery();
  const { isPending, isError } = useFetchAuthenticationQuery();

  const routes = [
    { name: 'Overview', href: studentRoutes.overview },
    { name: 'Courses', href: studentRoutes.courses },
    { name: 'Referrals', href: studentRoutes.referrals },
    { name: 'Profile', href: appRoutes.profile },
    { name: 'Support', href: studentRoutes.support },
  ]

  useEffect(() => {
    const user = storageUtil.getItem(StorageKey.user) as IUser;
    if (user?.role === 'admin') {
      router.push(adminRoutes.dashboard);
    }
  }, [isPending]);

  if (isPending || isError) {
    return (
      <div className='relative w-screen min-h-screen grid place-items-center'>
        <div className='flex flex-col items-center gap-4'>
          <Image src='/logos/logo.svg' alt='The Grind Academy Logo' width={240} height={60} className={clsx('transition-opacity duration-700')} />
          <BrandBars containerClassName={clsx('w-52 animate-pulse')} barClassName="!h-12" />
        </div>
      </div>
    )
  }

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
