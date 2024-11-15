import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid place-items-center h-screen w-screen bg-background p-4'>
      <div className='flex flex-col items-center gap-10 w-full'>
        <Link href='/login'>
          <Image src='/logos/logo.svg' alt='Logo' width={166} height={32} />
        </Link>
        {children}
      </div>
    </div>
  )
}
