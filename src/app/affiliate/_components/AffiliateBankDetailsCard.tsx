import IconifyIcon from '@/components/IconifyIcon'
import { Button } from '@/components/ui/button'
import React from 'react'
import Skeleton from 'react-loading-skeleton';
import AffiliateReferralCodeCard from './AffiliateReferralCodeCard';
import { useFetchAffiliateReferralQuery } from '@/hooks/api/affiliate/useAffiliateReferral';

export default function AffiliateBankDetailsCard() {
  const { data: referralCode, isPending } = useFetchAffiliateReferralQuery();

  if (isPending) return (
    <div className='bg-[#00246B] rounded p-4 w-full flex flex-col gap-3'>
      <Skeleton height={40} width={40} baseColor="#001b50" highlightColor="#00205e" />
      <Skeleton height={30} width={150} baseColor="#001b50" highlightColor="#00205e" />
      <Skeleton height={28} baseColor="#001b50" highlightColor="#00205e" />
    </div>
  )

  if (referralCode) return <AffiliateReferralCodeCard />;

  return (
    <div className='bg-[#00246B] rounded p-4 w-full flex flex-col gap-3'>
      <IconifyIcon icon="ri:bank-fill" className='text-white text-3xl' />
      <div className='flex items-end gap-4 justify-between'>
        <div>
          <p className='text-white text-lg font-medium'>Set Up Your Bank Details</p>
          <p className='text-accent text-sm'>Add your bank details to activate referrals and receive payouts seamlessly</p>
        </div>
        <Button href='/affiliate/settings#bank-information' size='sm'>Add Bank Details</Button>
      </div>
    </div>
  )
}
