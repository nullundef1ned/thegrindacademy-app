import clsx from 'clsx';
import React from 'react'

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className, children }: CardProps) {
  return (
    <div className={clsx('rounded-md border bg-[#121B353B] border-[#B0CAFF1A] p-4', className)}>
      {children}
    </div>
  )
}
