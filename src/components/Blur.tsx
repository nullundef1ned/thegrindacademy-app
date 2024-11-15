import { clsx } from 'clsx'
import React from 'react'

type BlurProps = {
  className?: string;
}

export default function Blur({ className }: BlurProps) {
  return (
    <div className={clsx('bg-primary/20 blur-[90px] rounded-[50%]', className)} />
  )
}
