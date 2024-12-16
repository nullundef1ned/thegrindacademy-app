import React from 'react'
import { Icon, IconifyIconProps } from '@iconify-icon/react';

type IconProps = IconifyIconProps;

export default function IconifyIcon({ icon, className, size, style }: IconProps) {
  return (
    <Icon icon={icon} className={className} width={size} height={size} size={size} style={style} />
  )
}