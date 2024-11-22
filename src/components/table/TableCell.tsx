import React from 'react'
import clsx from 'clsx';
import TableCellContent from './TableCellContent';
import { TableHeader } from './table.interface';

type TableCellProps = {
  row: any;
  header: TableHeader<any>;
}

export default function TableCell({ row, header }: TableCellProps) {
  return (
    <td
      className={clsx("p-4 whitespace-nowrap text-sm font-normal")}
    >
      <TableCellContent row={row} header={header} />
    </td>
  )
}
