'use client';

import React, { Suspense, useEffect } from 'react'
import Header from '../../components/Header';
import { navigationRoutes } from './_module/student.routes';
import { useStudentStore } from '../../stores/student.store';
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
import { affiliateRoutes } from '../affiliate/_module/affiliate.routes';

function StudentLayout({ children }: { children: React.ReactNode }) {
  const banners = useStudentStore((state) => state.banners);
  const setBanners = useStudentStore((state) => state.setBanners);

  const router = useRouter();

  const { useFetchAuthenticationQuery } = StudentQueries();

  const { data: user, isPending, isError } = useFetchAuthenticationQuery();
  // const { data: referral, isPending: isReferralPending } = useFetchReferralQuery();
  const { subscription, isPending: isSubscriptionPending, disableAccess } = useSubscriptionHook();

  const removeBanner = (slug: string) => {
    const newBanners = banners.filter((b) => b.slug !== slug);
    setBanners(newBanners)
  }

  useEffect(() => {
    const user = storageUtil.getItem(StorageKey.user) as IUser;
    if (user?.role === 'admin') {
      router.push(adminRoutes.dashboard);
    } else if (user?.role === 'affiliate') {
      router.push(affiliateRoutes.dashboard);
    }
  }, [isPending]);

  useEffect(() => {
    const banners: IBanner[] = [];
    const inThreeDays = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);

    if (!user?.info.telegramUserName) {
      const telegramUsernameBanner: IBanner = {
        slug: 'telegram-username',
        message: 'Please add your telegram username to gain the full benefits of our platform.',
        link: '/profile',
        buttonText: 'Add Telegram Username',
        permanent: false,
        type: 'info',
      }
      banners.push(telegramUsernameBanner)
    }

    if (subscription && !isSubscriptionPending) {
      const activeSubscription = subscription.active;
      const unpaidSubscription = subscription.unpaid;

      if (unpaidSubscription && !activeSubscription) {
        const unpaidBanner: IBanner = {
          slug: 'subscription-unpaid',
          message: 'You have an unpaid subscription. Please make payment to resume access.',
          link: unpaidSubscription.paymentLink || undefined,
          buttonText: 'Make Payment',
          permanent: true,
          blank: true,
          type: 'error',
        }
        banners.push(unpaidBanner)
      }

      if (!activeSubscription && !unpaidSubscription) {
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

      if (activeSubscription?.endDate && !activeSubscription.autoRenewal && new Date(activeSubscription.endDate) < inThreeDays) {
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

    // if (!referral && !isReferralPending) {
    //   const addBankDetailsBanner: IBanner = {
    //     slug: 'add-bank-details',
    //     message: 'Add your bank details to receive payouts. Your referral payouts are waiting!',
    //     link: '/profile#bank-information',
    //     buttonText: 'Add Bank Details',
    //     permanent: false,
    //     type: 'info',
    //   }
    //   banners.push(addBankDetailsBanner)
    // }

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

  if (user.status == 'suspended') {
    return (
      <div className='relative w-screen min-h-screen grid place-items-center'>
        <div className='flex flex-col items-center gap-4'>
          <Image src='/logos/logo.svg' alt='The Grind Academy Logo' width={240} height={60} className={clsx('transition-opacity duration-700')} />
          <p className='text-sm text-accent text-center'>
            Your account has been suspended. Please contact <a href='mailto:support@thegrindacademy.com' className='text-accent underline'>support</a> for more information.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(!disableAccess ? 'min-h-screen' : 'h-screen overflow-hidden', 'relative w-screen space-y-6')}>
      <Header routes={navigationRoutes} />
      {banners.length > 0 && (
        <div className='w-full responsive-section sticky top-36 z-40 bg-background flex flex-col gap-4'>
          {banners.map((banner, index) => (
            <Banner banner={banner} key={index} removeBanner={removeBanner} />
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
