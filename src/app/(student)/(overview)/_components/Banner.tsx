import React from 'react'
import { IBanner } from '../../_module/student.interface';
import IconifyIcon from '@/components/IconifyIcon';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { useStudentStore } from '../../_module/student.store';

interface IBannerProps {
  banner: IBanner;
}

export default function Banner({ banner }: IBannerProps) {
  const banners = useStudentStore((state) => state.banners);
  const setBanners = useStudentStore((state) => state.setBanners);

  const color = {
    info: 'bg-[#00246B66]',
    warning: 'bg-[#50051E]',
    error: 'bg-[#50051E]',
    success: 'bg-[#006644]',
  }[banner.type || 'error']

  const removeBanner = () => {
    const newBanners = banners.filter((b) => b.message !== banner.message);
    setBanners(newBanners)
  }

  return (
    <div className={clsx(color, 'p-3 w-full flex items-center justify-between')}>
      <div className='flex items-center gap-2'>
        <IconifyIcon icon='ri:information-2-fill' className={clsx('text-2xl text-white/70')} />
        <p className='text-white text-sm'>
          {banner.message}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {banner.link && banner.buttonText && (
          <Button href={banner.link} size='sm' className='rounded-[2px] !bg-white/20'>{banner.buttonText}</Button>
        )}
        {!banner.permanent &&
          <div className='cursor-pointer flex items-center justify-center' onClick={removeBanner}>
            <IconifyIcon icon='ri:close-circle-fill' className={clsx('text-xl text-white/70')} />
          </div>
        }
      </div>
    </div>
  )
}
