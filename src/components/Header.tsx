'use client';

import Avatar from '@/components/Avatar'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { appRoutes } from '@/app/_module/app.routes';
import { useMemo } from 'react';
import { URLKeyEnum } from '@/app/_module/app.enum';
import useURL from '@/hooks/useURL';
import { useFetchUser } from '@/app/_module/_apis/useFetchUser';
import usePathFinder from '@/hooks/usePathFinder';

interface HeaderProps {
  routes: { name: string, href: string }[]
}

export default function Header({ routes }: HeaderProps) {
  const { data: user } = useFetchUser();

  const { updateParams } = useURL();
  const { loginPath, currentPath } = usePathFinder();

  const greeting = useMemo(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) return 'morning';
    if (hours < 18) return 'afternoon';
    return 'evening';
  }, []);

  const handleLogout = () => {
    updateParams({ key: URLKeyEnum.LOGOUT, value: 'true' }, loginPath);
  }

  return (
    <div className='border-b border-[#B0CAFF1A] px-4 pt-6 sticky top-0 bg-background z-40'>
      <div className="responsive-section space-y-6">
        <div className='w-full flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar src={user?.info.avi} alt={user?.info.firstName || ''} size={40} type='square' />
            <div className='flex flex-col'>
              <p className='font-semibold'>Good {greeting} {user?.info.firstName}</p>
              <p className='text-sm hidden md:block text-accent hover:text-primary-100 cursor-pointer w-max' onClick={handleLogout}>Logout</p>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <Link href={appRoutes.home}>
              <Image src='/logos/logo.svg' alt='Logo' width={166} height={32} />
            </Link>
            <p className='text-sm md:hidden text-accent hover:text-primary-100 cursor-pointer w-max' onClick={handleLogout}>Logout</p>
          </div>
        </div>
        <div className='w-full flex items-end gap-6 overflow-x-auto'>
          {routes.map((route) => (
            <Link href={route.href} key={route.name}>
              <div className='flex flex-col gap-3 group'>
                <p className={clsx(currentPath === route.href && 'font-semibold text-white', 'text-accent font-medium px-2 whitespace-nowrap')}>{route.name}</p>
                <div className={clsx(currentPath === route.href && 'bg-primary', 'w-full h-0.5 group-hover:bg-primary/50')} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
