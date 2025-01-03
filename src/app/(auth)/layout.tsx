'use client';

import Image from 'next/image'
import React, { Suspense, useEffect } from 'react'
import Link from 'next/link'
import Blur from '@/components/Blur';
import { anchor } from '../i/_module/admin.routes';
import { usePathname, useRouter } from 'next/navigation';

type AuthLayoutProps = {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  const pathname = usePathname();
  const isAdmin = pathname.startsWith(`/${anchor}`);
  const isAffiliate = pathname.startsWith('/affiliate');
  const rootPath = isAdmin ? `/${anchor}/login` : isAffiliate ? `/affiliate/login` : `/login`

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        router.push(`/${anchor}/login`);
      }
    })
  }, [])

  return (
    <div className='grid place-items-center h-screen w-screen bg-background p-4 relative'>
      <div className='absolute bottom-0 left-0 p-4 group transition-all'>
        <Link href='/i/login' className='text-sm text-accent hidden group-hover:block transition-all cursor-pointer'>Log in as admin</Link>
      </div>
      <Blur className='absolute top-1/2 w-1/2 left-1/2 -translate-x-1/2 h-1/2 -translate-y-1/2 bg-primary/5 z-0' />
      <div className='flex flex-col items-center gap-10 w-full z-20'>
        <Link href={rootPath}>
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