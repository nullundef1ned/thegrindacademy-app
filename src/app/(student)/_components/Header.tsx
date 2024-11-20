'use client';

import { useAppStore } from '@/app/_module/app.store';
import Avatar from '@/components/Avatar'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface HeaderProps {
  routes: { name: string, href: string }[]
}

export default function Header({ routes }: HeaderProps) {
  const user = useAppStore((state) => state.user);

  const pathname = usePathname();

  return (
    <div className='space-y-6 border-b border-[#B0CAFF1A] px-4 pt-6 sticky top-0 bg-background'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Avatar alt={user?.name || ''} size={40} />
          <div className='flex flex-col'>
            <p className='font-semibold'>Good morning {user?.firstName}</p>
            <Link href='/profile' className='text-sm hover:text-primary-100'>View Profile</Link>
          </div>
        </div>
        <Link href='/overview'>
          <Image src='/logos/logo.svg' alt='Logo' width={166} height={32} />
        </Link>
      </div>
      <div className='w-full flex items-end gap-6'>
        {routes.map((route) => (
          <Link href={route.href} key={route.name}>
            <div className='flex flex-col gap-3 group'>
              <p className={clsx(pathname == route.href && 'font-semibold text-white', 'text-accent font-medium px-2')}>{route.name}</p>
              <div className={clsx(pathname == route.href && 'bg-primary', 'w-full h-0.5 group-hover:bg-primary/50')} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
