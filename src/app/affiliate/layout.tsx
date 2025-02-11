'use client';

import React, { Suspense, useEffect } from 'react'
import Header from '../../components/Header';
import { affiliateRoutes } from './_module/affiliate.routes';
import Image from 'next/image';
import BrandBars from '@/components/BrandBars';
import { clsx } from 'clsx';
import storageUtil, { StorageKey } from '@/utils/storage.util';
import { adminRoutes } from '../i/_module/admin.routes';
import { IUser } from '../_module/app.interface';
import { useRouter } from 'next/navigation';
import { useAffiliateStore } from '@/stores/affiliate.store';
import { studentRoutes } from '../(student)/_module/student.routes';
import { IBanner } from '../(student)/_module/student.interface';
import Banner from '../(student)/(overview)/_components/Banner';
import { useFetchAffiliateAuthenticationQuery } from '@/hooks/api/affiliate/useAffiliateAuthentication';
import { useFetchAffiliateReferralQuery } from '@/hooks/api/affiliate/useAffiliateReferral';

function AffiliateLayout({ children }: { children: React.ReactNode }) {
  const banners = useAffiliateStore((state) => state.banners);
  const setBanners = useAffiliateStore((state) => state.setBanners);

  const router = useRouter();

  const routes = [
    { name: 'Overview', href: affiliateRoutes.dashboard },
    { name: 'Resources', href: affiliateRoutes.resources },
    { name: 'Payouts', href: affiliateRoutes.payouts },
    { name: 'Support', href: affiliateRoutes.support },
    { name: 'Settings', href: affiliateRoutes.settings },
  ]

  const { data: user, isPending, isError } = useFetchAffiliateAuthenticationQuery();
  const { data: referral, isPending: isReferralPending } = useFetchAffiliateReferralQuery();

  const removeBanner = (slug: string) => {
    const newBanners = banners.filter((b) => b.slug !== slug);
    setBanners(newBanners)
  }

  useEffect(() => {
    const user = storageUtil.getItem(StorageKey.user) as IUser;
    if (user?.role === 'admin') {
      router.push(adminRoutes.dashboard);
    } else if (user?.role === 'student') {
      router.push(studentRoutes.overview);
    }
  }, [isPending]);

  useEffect(() => {
    const banners: IBanner[] = [];

    if (!user?.info.telegramUserName) {
      const telegramUsernameBanner: IBanner = {
        slug: 'telegram-username',
        message: 'Please add your telegram username to gain the full benefits of our platform.',
        link: '/affiliate/setting',
        buttonText: 'Add Telegram Username',
        permanent: false,
        type: 'info',
      }
      banners.push(telegramUsernameBanner)
    }

    if (!referral && !isReferralPending) {
      const addBankDetailsBanner: IBanner = {
        slug: 'add-bank-details',
        message: 'Add your bank details to receive payouts. Your referral payouts are waiting!',
        link: '/affiliate/settings#bank-information',
        buttonText: 'Add Bank Details',
        permanent: false,
        type: 'info',
      }
      banners.push(addBankDetailsBanner)
    }

    setBanners(banners)
  }, [referral]);

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
    <div className={clsx('min-h-screen', 'relative w-screen space-y-6')}>
      <Header routes={routes} />
      {banners.length > 0 && (
        <div className='w-full responsive-section sticky top-36 z-40 bg-background flex flex-col gap-4'>
          {banners.map((banner, index) => (
            <Banner banner={banner} key={index} removeBanner={removeBanner} />
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
      <AffiliateLayout>
        {children}
      </AffiliateLayout>
    </Suspense>
  )
}
