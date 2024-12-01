'use client';

import Image from 'next/image'
import React, { Suspense } from 'react'
import Link from 'next/link'
import Blur from '@/components/Blur';

type AuthLayoutProps = {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='grid place-items-center h-screen w-screen bg-background p-4 relative'>
      <Blur className='absolute top-1/2 w-1/2 left-1/2 -translate-x-1/2 h-1/2 -translate-y-1/2 bg-primary/5 z-0' />
      <div className='flex flex-col items-center gap-10 w-full z-20'>
        <Link href='/login'>
          <Image src='/logos/logo.svg' alt='Logo' width={166} height={32} />
        </Link>
        {children}
      </div>
    </div>
  )
}


export default function SuspenseWrapper({ children }: AuthLayoutProps) {
  return (
    <Suspense>
      <AuthLayout>
        {children}
      </AuthLayout>
    </Suspense>
  )
}