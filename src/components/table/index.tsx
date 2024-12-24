'use client';

import React, { Fragment, Suspense, useMemo, useState } from "react";
import Each from "../Each";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import { IPagination, TData } from "@/app/_module/app.interface";
import TablePagination from "./TablePagination";
import TableCell from "./TableCell";
import IconifyIcon from "../IconifyIcon";
import { Checkbox } from "../ui/checkbox";
import { TableAction, TableTab } from "./table.interface";
import { TableHeader } from "./table.interface";
import Image from "next/image";
import SearchInput from "@/app/(student)/courses/_components/SearchInput";

export interface TableProps<T> {
  data?: IPagination<TData<T>>;
  addComponent?: React.ReactNode;
  loading?: boolean;
  fetching?: boolean;
  headers?: TableHeader<TData<T>>[];
  searchable?: boolean;
  actions?: TableAction<TData<T>>[];
  exclude?: string[];
  emptyStateMessage?: string;
  className?: string;
  selectedRows?: string[];
  skeletonCount?: number;
  activeTab?: string;
  tabs?: TableTab<T>[];
  hideFooter?: boolean;
  hideLimit?: boolean;
  refetch?: () => void;
  setActiveTab?: (tab: string) => void;
  selectRows?: (row: string[]) => void;
  onRowClick?: (row: TData<T>) => void;
  onTabChange?: (tab: string) => void;
};

function TableComponent<T>({ data, addComponent, headers, hideLimit, hideFooter, searchable = true, fetching, className, emptyStateMessage, loading, exclude, activeTab, tabs, selectedRows, actions, refetch, setActiveTab, onRowClick, onTabChange, selectRows, skeletonCount = 8 }: TableProps<T>) {

  const [selection, setSelection] = useState<string[]>(selectedRows || []);

  const excludedHeaders = useMemo(() => [...(exclude || []), 'id'], [exclude]);

  const usableHeaders = useMemo(() => {
    const selectedTabHeaders = tabs?.find((tab) => tab.key === activeTab)?.headers;
    if (selectedTabHeaders) {
      return selectedTabHeaders.filter((header) => !excludedHeaders.includes(header.key as string));
    }

    return headers?.filter((header) => !excludedHeaders.includes(header.key as string)) || [];
  }, [tabs, headers, activeTab])

  const usableActions = useMemo(() => {
    const selectedTabActions = tabs?.find((tab) => tab.key === activeTab)?.actions;
    if (selectedTabActions) {
      return selectedTabActions;
    }

    return actions || [];
  }, [tabs, headers, activeTab, actions])

  const usableData = useMemo(() => {
    const selectedTabData = tabs?.find((tab) => tab.key === activeTab)?.data;
    if (selectedTabData) {
      return selectedTabData;
    }

    return data || { result: [], currentPage: 1, totalPages: 1, totalCount: 0, previousPage: null, nextPage: null };
  }, [tabs, data, activeTab]);

  if (usableData.result?.length > 0 && !usableData.result.every((row) => 'id' in row)) {
    return "Table data must have an id field";
  }

  if (usableHeaders.length === 0) {
    return <p>Add Headers to render table</p>
  }

  const hasActions = usableActions && usableActions.length > 0;
  const allSelected = selection?.length === usableData.result?.length && selection.length > 0;
  const headerCount = usableHeaders.length + (selectRows ? 1 : 0) + (hasActions ? 1 : 0);

  const handleRowClick = (row: TData<T>) => {
    onRowClick?.(row);
  }

  const handleActionClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: unknown & { id: string }, perform?: TableAction<TData<T>>["perform"]) => {
    e.stopPropagation();
    perform?.(Number(row.id));
  }

  const handleTabChange = (tab: TableTab<T>) => {
    if (tab.key === activeTab) return;
    setActiveTab?.(tab.key);
    onTabChange?.(tab.name);
  }

  const updateSelection = (rows: string[]) => {
    setSelection(rows);
    selectRows?.(rows);
  }

  const toggleRowSelection = (row: unknown & { id: string }) => {
    const updatedRows = [...selection];

    if (updatedRows.includes(row.id)) {
      updatedRows.splice(updatedRows.indexOf(row.id), 1);
    } else {
      updatedRows.push(row.id);
    }

    updateSelection(updatedRows);
  }

  const toggleSelection = () => {
    if (allSelected) {
      updateSelection([]);
    } else {
      updateSelection(usableData.result.map((row: TData<T>) => row.id));
    }
  }

  return (
    <div className={className}>
      {tabs && tabs.length > 0 && (
        <div className="flex gap-4 items-end mb-6">
          <Each of={tabs} render={(tab) => (
            <div onClick={() => handleTabChange(tab)}
              className={`cursor-pointer transition-all flex flex-col gap-3 group`}>
              <p className={clsx(activeTab == tab.key && 'font-semibold text-white', 'text-accent font-medium px-2')}>{tab.name}</p>
              <div className={clsx(activeTab == tab.key && 'bg-primary', 'w-full h-0.5 group-hover:bg-primary/50')} />
            </div>
          )} />
        </div>
      )}
      <div className={`w-full flex flex-col bg-neutral-1000 ${tabs && tabs.length > 0 ? 'rounded-tl-none' : ''} overflow-hidden`}>
        {(searchable || addComponent) && (
          <div className="pb-4 grid place-content-center grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              {searchable && <SearchInput />}
              {refetch && <IconifyIcon onClick={() => refetch()} icon="ri:refresh-line" className={clsx(fetching && 'animate-spin', "text-grey-100 cursor-pointer")} />}
            </div>
            <div className="flex items-center justify-end">
              {addComponent}
            </div>
          </div>
        )}
        <div className="w-full overflow-x-auto">
          <table className="min-w-full overflow-hidden">
            <thead className="bg-[#12182B]">
              <tr>
                {selectRows && (
                  <th
                    scope="col"
                    className="px-4 py-3"
                  >
                    <Checkbox name="select-all" checked={allSelected} onCheckedChange={toggleSelection} />
                  </th>
                )}
                {usableHeaders.map((header, index: number) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-left text-grey-100 capitalize`}
                  >
                    {header.value}
                  </th>
                ))}
                {hasActions && (
                  <th
                    scope="col"
                    className="px-4 py-3 whitespace-nowrap text-sm font-medium text-left text-grey-100 capitalize"
                  >

                  </th>
                )}
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={headerCount} className="py-3">
                    <Skeleton count={skeletonCount} height={36} baseColor="#12182B" highlightColor="#0C1227" containerClassName="space-y-3" />
                  </td>
                </tr>
              </tbody>
            ) : (
              <Fragment>
                {usableData.result?.length > 0 ? (
                  <tbody>
                    {usableData.result?.map((row, index: number) => (
                      <Fragment key={index}>
                        <tr
                          onClick={() => handleRowClick(row)}
                          className={`border-b border-[#B0CAFF1A] last:border-0 even:bg-neutral-1000 ${onRowClick ? 'hover:bg-neutral-1000 cursor-pointer' : ''}`}
                        >
                          {selectRows && (
                            <td
                              className="p-4 whitespace-nowrap text-sm font-normal overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Checkbox name={row.id} checked={selection?.includes(row.id)} onCheckedChange={() => toggleRowSelection(row)} />
                            </td>
                          )}
                          {usableHeaders.map((header, index: number) => {
                            return <TableCell key={index} header={header} row={row} />
                          })}
                          {hasActions && (
                            <td
                              className="p-4 whitespace-nowrap text-sm font-normal overflow-hidden"
                            >
                              <div className="flex space-x-3">
                                <Each of={usableActions} render={({ icon, label, className, perform, render }: TableAction<TData<T>>) => {
                                  if (render) return render(row);
                                  return (
                                    <div onClick={(e) => handleActionClick(e, row, perform)} className={clsx('flex items-center space-x-1 cursor-pointer', className)}>
                                      {icon && <IconifyIcon icon={icon} />}
                                      <p className="text-xs">{label}</p>
                                    </div>
                                  )
                                }} />
                              </div>
                            </td>
                          )}
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={usableHeaders.length + (selectRows ? 1 : 0) + (hasActions ? 1 : 0)} className="p-4 whitespace-nowrap text-sm font-normal text-center h-80">
                        <div className="flex flex-col items-center justify-center">
                          <Image src="/images/empty-state.svg" alt="No data found" width={100} height={100} />
                          <p className="text-grey-100 text-sm">{emptyStateMessage || "No data found"}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </Fragment>
            )}
          </table>
        </div>
        {!hideFooter && <TablePagination pagination={usableData} hideLimit={hideLimit} />}
      </div>
    </div>
  );
};

export default function Table<T>(props: TableProps<T>) {
  return (
    <Suspense>
      <TableComponent {...props} />
    </Suspense>
  )
}