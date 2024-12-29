import { useFetchSubscriptionByReferenceQuery } from '@/app/(student)/_module/_apis/useSubscriptions';
import { studentRoutes } from '@/app/(student)/_module/student.routes';
import { appRoutes } from '@/app/_module/app.routes';
import { Button } from '@/components/ui/button';
import useCurrency from '@/hooks/useCurrency';
import helperUtil from '@/utils/helper.util';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react'
import LoadingIcons from 'react-loading-icons';

interface PaymentReferenceLookupProps {
  reference: string;
}

export default function PaymentReferenceLookup({ reference }: PaymentReferenceLookupProps) {
  const { data: subscription, isPending } = useFetchSubscriptionByReferenceQuery(reference);

  const { formatCurrency } = useCurrency();

  if (isPending) return (
    <div className='lg:col-span-2 flex flex-col items-center justify-center gap-6'>
      <LoadingIcons.TailSpin />
    </div>
  );

  if (!subscription) return (
    <div className='lg:col-span-2 flex flex-col items-center justify-center gap-6'>
      <div className='flex flex-col items-center justify-center gap-4 border p-6 max-w-md'>
        <Image src='/images/subscription-failed.svg' alt='Error' width={100} height={100} />
        <p className='text-lg font-gishaBold text-center'>Payment reference not found</p>
        <p className='text-center font-light'>We couldn&apos;t find a subscription with the provided reference. Please check the reference and try again.</p>
      </div>
      <Button size='sm' href={appRoutes.home}>Return to Dashboard</Button>
    </div>
  );

  const plan = subscription.userSubscription.subscriptionPlan.name;
  const autoRenewal = subscription.userSubscription.autoRenewal;
  const endDate = subscription.userSubscription.endDate;
  const amount = subscription.userSubscription.subscriptionPlan.price;

  return (
    <div className='lg:col-span-2 flex flex-col items-center justify-center gap-6'>
      <Fragment>
        <div className='flex flex-col items-center justify-center gap-4 border p-4 max-w-md'>
          {subscription.userSubscription.status == 'active' ?
            <Fragment>
              <Image src='/images/account-creation.svg' alt='Error' width={100} height={100} />
              <p className='text-xl font-gishaBold text-center'>Subscription Renewed Successfully! 🎉 </p>
              <p className='text-center font-light'>Your subscription has been successfully renewed. Thank you for continuing your learning journey with us!</p>
            </Fragment>
            :
            <Fragment>
              <Image src='/images/subscription-failed.svg' alt='Error' width={100} height={100} />
              <p className='text-xl font-gishaBold text-center'>Subscription Renewal Failed! </p>
              <p className='text-center font-light'>We encountered an issue while processing your payment. Please try again or contact <Link href={studentRoutes.support}>support</Link></p>
            </Fragment>
          }
          <hr className='border-[#B0CAFF1A] w-full' />
          <div className='grid grid-cols-3 gap-4 p-3 w-full bg-[#00246B1A] border border-[#B0CAFF1A] rounded'>
            <div className="flex flex-col gap-2">
              <p className='text-sm text-accent'>Plan Name</p>
              <p className='text-sm font-medium'>{plan}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className='text-sm text-accent'>{autoRenewal ? 'Renewal' : 'Expiration'} Date</p>
              <p className='text-sm font-medium'>{helperUtil.formatDate(endDate || '')}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className='text-sm text-accent'>Amount</p>
              <p className='text-sm font-medium'>{formatCurrency(amount || 0)}</p>
            </div>
          </div>
        </div>
        {subscription.userSubscription.status == 'active' ?
          <Button size='sm' href={appRoutes.home}>Return to Dashboard</Button>
          :
          <Button size='sm' onClick={() => window.location.href = subscription.paymentData.authorization_url}>Retry Payment</Button>
        }
      </Fragment>
    </div>
  )
}
