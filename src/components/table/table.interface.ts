import { IPagination, TData } from "@/app/_module/app.interface";
import { TableHeaderTypeEnum } from "./table.enum";

export interface TableHeader<T> {
  key: keyof T;
  value: string;
  type?: TableHeaderTypeEnum;
  fallback?: string;
}

export interface TableAction<T> {
  label?: string;
  icon?: string;
  className?: string;
  perform?: (id: number) => void | Promise<void>
  render?: (row: T) => React.ReactNode;
}

export interface TableTab<T> {
  name: string;
  key: string;
  headers?: TableHeader<T>[];
  actions?: TableAction<TData<T>>[];
  data: IPagination<T>;
}