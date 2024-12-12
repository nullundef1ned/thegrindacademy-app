'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BrandBars from '@/components/BrandBars';
import { appRoutes } from './_module/app.routes';

export default function NotFoundPage() {
  return (
    <div className='fixed inset-0 bg-background z-50 grid place-items-center place-content-center px-4'>
      <Link href={appRoutes.home}>
        <Image src='/logos/logo.svg' alt='The Grind Academy Logo' width={200} height={60} />
      </Link>
      <div className='relative mt-32 space-y-4 flex flex-col items-center'>
        <p className='absolute left-1/2 -translate-x-1/2 -top-[60%] md:-top-[90%] font-gishaBold text-[160px] -z-10 text-[#1A2031] opacity-70 hover:text-primary hover:text-opacity-10 transition-all duration-700 select-none'>404</p>
        <h1 className='font-gishaBold text-4xl lg:text-5xl text-center'>Oops! Page Not Found</h1>
        <p className='text-muted-foreground text-center'>The page you&apos;re looking for doesn&apos;t exist or has been moved</p>
        <Button variant='default' href={appRoutes.home}>Return to Dashboard</Button>
      </div>
      <BrandBars containerClassName='absolute w-1/5 right-0 hidden md:block' barClassName='!h-14' />
      <BrandBars containerClassName='absolute w-1/5 left-0 hidden md:block' barClassName='!h-14' />
    </div>
  )
}
