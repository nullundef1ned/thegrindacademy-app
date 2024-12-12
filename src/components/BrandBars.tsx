import { clsx } from 'clsx';
import React from 'react'

type BrandBarsProps = {
  containerClassName?: string;
  barClassName?: string;
}

export default function BrandBars({ containerClassName, barClassName }: BrandBarsProps) {
  return (
    <div className={clsx('space-y-6 group', containerClassName)}>
      <div className={clsx(barClassName, 'h-20 w-full border bg-[#1D253F] border/20 opacity-20 group-hover:bg-primary group-hover:opacity-15 transition-all duration-700')}></div>
      <div className={clsx(barClassName, 'h-20 w-full border bg-[#1D253F] border/20 opacity-20 group-hover:bg-primary group-hover:opacity-15 transition-all duration-700')}></div>
    </div>
  )
}
