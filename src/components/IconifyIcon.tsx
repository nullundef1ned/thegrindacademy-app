import React from 'react'
import { Icon, IconifyIconProps } from '@iconify-icon/react';

type IconProps = IconifyIconProps & {
  dataAos?: string;
  containerClassName?: string;
  dataAosDelay?: number;
}

export default function IconifyIcon({ icon, className, size, dataAos, dataAosDelay, containerClassName }: IconProps) {
  return (
    <div data-aos={dataAos} data-aos-delay={dataAosDelay} className={containerClassName}>
      <Icon icon={icon} className={className} width={size} height={size} size={size} />
    </div>
  )
}