export interface IUser {
  firstName: string;
  lastName: string;
  name: string;
  referralCode: string;
}

export interface IPagination<T> {
  result: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  previousPage: number | null;
  nextPage: number | null;
}