import React from 'react'
import { Icon, IconifyIconProps } from '@iconify-icon/react';

type IconProps = IconifyIconProps & {
  containerClassName?: string;
}

export default function IconifyIcon({ icon, className, size, containerClassName }: IconProps) {
  return (
    <Icon icon={icon} className={className} width={size} height={size} size={size} />
  )
}