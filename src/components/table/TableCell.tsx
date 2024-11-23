import React from 'react'
import clsx from 'clsx';
import TableCellContent from './TableCellContent';
import { TableHeader } from './table.interface';
import { TData } from '@/app/_module/app.interface';

type TableCellProps<T> = {
  row: TData<T>;
  header: TableHeader<TData<T>>;
}

export default function TableCell<T>({ row, header }: TableCellProps<T>) {
  return (
    <td
      className={clsx("p-4 whitespace-nowrap text-sm font-normal")}
    >
      <TableCellContent row={row} header={header} />
    </td>
  )
}