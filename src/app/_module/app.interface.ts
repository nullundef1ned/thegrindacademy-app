export interface IUser {
  firstName: string;
  lastName: string;
  name: string;
  referralCode: string;
}

export type TData<T> = T & { id: string };

export interface IPagination<T> {
  result: TData<T>[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  previousPage: number | null;
  nextPage: number | null;
}