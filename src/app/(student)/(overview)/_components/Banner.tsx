import React from 'react'
import { IBanner } from '../../_module/student.interface';
import IconifyIcon from '@/components/IconifyIcon';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';

interface IBannerProps {
  banner: IBanner;
  removeBanner: (slug: string) => void;
}

export default function Banner({ banner, removeBanner }: IBannerProps) {

  const color = {
    info: 'bg-[#00246B66]',
    warning: 'bg-[#50051E]',
    error: 'bg-[#50051E]',
    success: 'bg-[#006644]',
  }[banner.type || 'error']
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
          <Button href={banner.link} size='sm' className='rounded-[2px] !bg-white/20' target={banner.blank ? '_blank' : undefined}>{banner.buttonText}</Button>
        )}
        {!banner.permanent &&
          <div className='cursor-pointer flex items-center justify-center' onClick={() => removeBanner(banner.slug)}>
            <IconifyIcon icon='ri:close-circle-fill' className={clsx('text-xl text-white/70')} />
          </div>
        }
      </div>
    </div>
  )
}
