import { IPagination } from '@/app/_module/app.interface'
import IconifyIcon from '@/components/IconifyIcon'
import useURL from '@/hooks/useURL'
import clsx from 'clsx'
import React from 'react'

interface PaginatorProps<T> {
  pagination: IPagination<T> | undefined
}

export default function Paginator<T>({ pagination }: PaginatorProps<T>) {
  const { searchParams, updateParams } = useURL();

  const page = searchParams.get('page') || 1;

  const goToPage = (page: number) => {
    if (page === 0) return;
    if (page > (pagination?.totalPages || 1)) return;
    updateParams({ key: 'page', value: page.toString() });
  }

  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex gap-4 justify-center">
      <div aria-disabled={Number(page) === 1} className="pagination-button" onClick={() => goToPage(Number(page) - 1)}>
        <IconifyIcon icon="mdi:chevron-left" className="text-white flex items-center text-lg" />
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: pagination?.totalPages || 1 }, (_, index) => (
          <div key={index} className={clsx("pagination-button", Number(page) === index + 1 && "bg-primary border-primary")} onClick={() => goToPage(index + 1)}>
            <p className="text-white text-sm">{index + 1}</p>
          </div>
        ))}
      </div>
      <div aria-disabled={Number(page) === pagination?.totalPages} className="pagination-button" onClick={() => goToPage(Number(page) + 1)} >
        <IconifyIcon icon="mdi:chevron-right" className="text-white flex items-center text-lg" />
      </div>
    </div>
  )
}
