import { IPagination } from '@/app/_module/app.interface';
import React from 'react'
import useURL from '@/hooks/useURL';
import clsx from 'clsx';
import Each from '../Each';
import { Button } from '../ui/button';

type TablePaginationProps<T> = {
  pagination: IPagination<T>;
  hideLimit?: boolean;
}

type PageItem = number | '...';

const limits = [10, 20, 50, 100, 150]

const generatePageNumbers = (currentPage: number, totalPages: number): PageItem[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pageNumbers: PageItem[] = [1];
  let middleStart = Math.max(2, currentPage - 1);
  let middleEnd = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) {
    middleEnd = 4;
  } else if (currentPage >= totalPages - 2) {
    middleStart = totalPages - 3;
  }

  if (middleStart > 2) {
    pageNumbers.push('...');
  }

  for (let i = middleStart; i <= middleEnd; i++) {
    pageNumbers.push(i);
  }

  if (middleEnd < totalPages - 1) {
    pageNumbers.push('...');
  }

  if (pageNumbers[pageNumbers.length - 1] !== totalPages) {
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
}

export default function TablePagination<T>({ pagination, hideLimit }: TablePaginationProps<T>) {
  const { updateParams, replaceParams } = useURL();

  if (!pagination || pagination.totalPages <= 1) return null;

  const pages = generatePageNumbers(pagination.currentPage, pagination.totalPages);

  const handlePageClick = (page: PageItem) => {
    if (page === '...') return;
    updateParams({ key: 'page', value: page }, undefined, { scroll: false });
  }

  const handleNextPage = () => {
    if (pagination.nextPage) {
      updateParams({ key: 'page', value: pagination.nextPage }, undefined, { scroll: false });
    }
  }

  const handlePreviousPage = () => {
    if (pagination.previousPage) {
      updateParams({ key: 'page', value: pagination.previousPage }, undefined, { scroll: false });
    }
  }

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    replaceParams({ key: 'limit', value: e.target.value }, undefined, { scroll: false });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center px-4 pt-5 border-t">
      <div className="flex items-center space-x-2">
        <p className="text-grey-200 text-sm w-max whitespace-nowrap">Page {pagination.currentPage} of {pagination.totalPages}</p>
        {!hideLimit && (
          <div className='flex'>
            <select onChange={handleLimitChange} className='text-sm bg-transparent text-grey-200 cursor-pointer focus:outline-none'>
              <Each of={limits} render={(limit) => (
                <option key={limit} value={limit}>{limit} results</option>
              )} />
            </select>
          </div>
        )}
      </div>
      {pagination.totalPages > 1 && (
        <div className="flex space-x-2 mx-auto">
          <Each of={pages} render={(page) => (
            <div
              onClick={() => handlePageClick(page)}
              className={clsx(pagination.currentPage == page && 'text-white medium !border-primary-50',
                "bg-gray-900 rounded-md h-7 w-7 border border-transparent flex items-center justify-center cursor-pointer hover:border-primary-50")}>
              <p className="text-sm">{page}</p>
            </div>
          )} />
        </div>
      )}
      <div className="flex items-center space-x-4 ml-auto">
        {pagination.previousPage && (
          <Button
            size="sm"
            variant="outline"
            onClick={handlePreviousPage}
            // icon={{ position: 'left', src: 'jam:arrow-left', size: 18 }}
            className='!pr-4 !pl-2.5 medium text-xs rounded-md hover:bg-neutral-500 hover:border-neutral-500 transition-all'
          >
            Previous
          </Button>
        )}

        {pagination.nextPage && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleNextPage}
            // icon={{ position: 'right', src: 'jam:arrow-right', size: 18 }}
            className='!pl-4 !pr-2.5 medium text-xs rounded-md hover:bg-neutral-500 hover:border-neutral-500 transition-all'
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
