'use client';

import Link from 'next/link'
import React, { Suspense } from 'react'
import LoadingIcons from 'react-loading-icons';
import Image from 'next/image';
import { appRoutes } from '../_module/app.routes';
import SubscriptionForm from './_components/SubscriptionForm';
import PaymentReferenceLookup from './_components/PaymentReferenceLookup';

export default function SubscriptionPage({ searchParams }: { searchParams: { ref: string } }) {
  const reference = searchParams.ref;

  return (
    <Suspense fallback={<div className='w-full h-full flex items-center justify-center'><LoadingIcons.TailSpin /></div>}>
      <div className='responsive-section space-y-6 p-4 lg:px-10 h-screen w-screen grid grid-cols-1 place-items-center'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='lg:col-span-2 flex items-center justify-center'>
            <Link href={appRoutes.home} className='flex items-center gap-2 text-accent'>
              <Image src='/logos/logo.svg' alt='Logo' width={240} height={32} />
            </Link>
          </div>

          {reference ?
            <PaymentReferenceLookup reference={reference} />
            :
            <SubscriptionForm />
          }
        </div>
      </div>
    </Suspense>
  )
}