import Link from 'next/link'
import React from 'react'
import IconifyIcon from './IconifyIcon'

export interface BreadcrumbItem {
  name: string
  link?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-1">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.link && <Link href={item.link} className="text-xs">{item.name}</Link>}
          {!item.link && <p className="text-xs font-medium text-accent">{item.name}</p>}
          {index < items.length - 1 && <IconifyIcon icon="ri:arrow-right-s-line" className="text-xs" />}
        </React.Fragment>
      ))}
    </div>
  )
}
