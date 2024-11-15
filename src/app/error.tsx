'use client';

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BrandBars from '@/components/BrandBars';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className='fixed inset-0 bg-background z-50 grid place-items-center place-content-center px-4'>
      <Link href='/'>
        <Image src='/logos/logo.svg' alt='The Grind Academy Logo' width={200} height={60} />
      </Link>
      <div className='relative mt-32 space-y-4 flex flex-col items-center'>
        <h1 className='font-gishaBold text-4xl md:text-5xl text-center'>Uh-oh! Something Went Wrong</h1>
        <p className='text-muted-foreground text-center'>We&apos;re having trouble loading this page. Try refreshing or check back later</p>
        <Button variant='default' onClick={() => router.refresh()}>Try Again</Button>
      </div>
      <BrandBars containerClassName='absolute w-1/5 right-0 hidden md:block' barClassName='!h-14' />
      <BrandBars containerClassName='absolute w-1/5 left-0 hidden md:block' barClassName='!h-14' />
    </div>
  )
}
