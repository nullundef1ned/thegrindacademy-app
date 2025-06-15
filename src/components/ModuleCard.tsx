import React from 'react'
import IconifyIcon from './IconifyIcon'
import Link from 'next/link'

interface ModuleCardProps {
  icon: string
  name: string
  description: string
  linkText: string
  link: string
}

export default function ModuleCard({ icon, name, description, linkText, link }: ModuleCardProps) {
  return (
    <div className="flex flex-col justify-between rounded overflow-hidden border border-[#1A2031] bg-[#1C347D1A]">
      <div className="flex flex-col items-start gap-2 p-4">
        <IconifyIcon icon={icon} className='text-2xl text-primary-100' />
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-accent">{description}</p>
      </div>
      <Link href={link} className="bg-[#1C347D33] p-4 flex items-center justify-center border-t border-[#1A2031]">
        <p className="text-xs uppercase font-medium text-primary-200">{linkText}</p>
      </Link>
    </div>
  )
}
