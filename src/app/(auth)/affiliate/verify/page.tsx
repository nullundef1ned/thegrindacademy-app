'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/dist/client/link';
import LoadingIcons from 'react-loading-icons';
import Image from 'next/image';
import { useTitle } from '@/providers/title.provider';
import useURL from '@/hooks/useURL';
import { useVerifyAffiliateAccountQuery } from '../_module/affiliate.auth.queries';
import storageUtil from '@/utils/storage.util';
import { StorageKey } from '@/utils/storage.util';
import { queryClient } from '@/providers/tanstack-query.provder';
import { useRouter } from 'next/navigation';
import { affiliateRoutes } from '@/app/affiliate/_module/affiliate.routes';

export default function SetupAccountPage() {

  const { searchParams } = useURL();

  const { setTitle } = useTitle();
  const router = useRouter();

  const token = searchParams.get('token') || '';

  const [showLink, setShowLink] = useState(false);

  const { data: tokenData, isPending, isError } = useVerifyAffiliateAccountQuery(token)

  useEffect(() => {
    if (tokenData) {
      setTimeout(() => {
        storageUtil.saveItem(StorageKey.user, tokenData.user)
        storageUtil.saveItem(StorageKey.token, tokenData.accessToken)
        queryClient.setQueryData(['user'], tokenData.user)

        router.push(affiliateRoutes.dashboard)
      }, 2000);

      setTimeout(() => {
        setShowLink(true)
      }, 4000);
    }
  }, [tokenData])

  if (isPending) {
    setTitle('Loading...')

    return (
      <div className='flex items-center justify-center h-full'>
        <LoadingIcons.TailSpin stroke="#FFF" />
      </div>
    )
  }

  if (!token || isError || !tokenData) {
    setTitle('Invalid Token')

    return (
      <div className='flex flex-col items-center space-y-3 justify-center h-full max-w-md'>
        <Image src='/images/invite-error-state.svg' alt='Invalid Token' width={140} height={140} />
        <p className='text-center text-2xl font-semibold'>The link you used appears to be invalid</p>
        <p className='text-center text-sm text-accent'>Please verify the link or reach out to <Link
          className='underline'
          href='mailto:support@thegrindacademy.com'>support</Link> for further assistance</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center space-y-3 justify-center h-full max-w-md'>
      <Image src='/images/account-creation.svg' alt='Invalid Token' width={140} height={140} />
      <p className='text-center text-2xl font-semibold'>Your account has been verified</p>
      <p className='text-center text-sm text-accent'>Welcome to The Grind Academy Affiliate Program</p>
      {showLink && <Link href={affiliateRoutes.dashboard} className='text-center text-sm text-accent underline'>Proceed to your dashboard</Link>}
    </div>
  )
}
