'use client';

import React, { Suspense, useEffect } from 'react'
import Header from '../../components/Header';
import { navigationRoutes } from './_module/student.routes';
import { useStudentStore } from './_module/student.store';
import Banner from './(overview)/_components/Banner';
import StudentQueries from './_module/student.queries';
import Image from 'next/image';
import BrandBars from '@/components/BrandBars';
import { clsx } from 'clsx';
import storageUtil, { StorageKey } from '@/utils/storage.util';
import { adminRoutes } from '../i/_module/admin.routes';
import { IUser } from '../_module/app.interface';
import { useRouter } from 'next/navigation';
import { IBanner } from './_module/student.interface';
import useSubscriptionHook from './_module/subscription.hook';

function StudentLayout({ children }: { children: React.ReactNode }) {
  const banners = useStudentStore((state) => state.banners);
  const setBanners = useStudentStore((state) => state.setBanners);

  const router = useRouter();

  const { useFetchAuthenticationQuery } = StudentQueries();
  
  const { isPending, isError } = useFetchAuthenticationQuery();
  const { subscription, isPending: isSubscriptionPending, disableAccess } = useSubscriptionHook();

  useEffect(() => {
    const user = storageUtil.getItem(StorageKey.user) as IUser;
    if (user?.role === 'admin') {
      router.push(adminRoutes.dashboard);
    }
  }, [isPending]);

  useEffect(() => {
    const banners: IBanner[] = [];
    const inThreeDays = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);

    if (subscription) {
      const activeSubscription = subscription.active;

      if (!activeSubscription) {
        const expiredBanner: IBanner = {
          slug: 'subscription-expired',
          message: 'Your subscription has expired and your access has currently been revoked. Renew now to continue accessing our courses.',
          link: '/subscription',
          buttonText: 'Renew Subscription',
          permanent: true,
          type: 'error',
        }
        banners.push(expiredBanner)
      }

      if (activeSubscription?.endDate && new Date(activeSubscription.endDate) < inThreeDays) {
        const timeLeft = Math.floor((new Date(activeSubscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        const expiringBanner: IBanner = {
          slug: 'subscription-expiring',
          message: `Your subscription is expiring in ${timeLeft} days. Renew now to keep your access uninterrupted.`,
          link: '/subscription',
          buttonText: 'Renew Subscription',
          permanent: false,
          type: 'warning',
        }
        banners.push(expiringBanner)
      }
    }

    setBanners(banners)
  }, [subscription]);

  if (isPending || isError || isSubscriptionPending) {
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
    <div className={clsx(!disableAccess ? 'min-h-screen' : 'h-screen overflow-hidden', 'relative w-screen space-y-6')}>
      <Header routes={navigationRoutes} />
      {banners.length > 0 && (
        <div className='px-4 w-full responsive-section sticky top-36 z-40 bg-background flex flex-col gap-4'>
          {banners.map((banner, index) => (
            <Banner banner={banner} key={index} />
          ))}
        </div>
      )}
      {disableAccess && (
        <div className='w-full h-screen absolute top-0 bg-background/40 z-30' />
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
