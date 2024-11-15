'use client';

import Image from 'next/image'
import React, { Suspense } from 'react'
import Link from 'next/link'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='grid place-items-center h-screen w-screen bg-background p-4'>
      <div className='flex flex-col items-center gap-10 w-full'>
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