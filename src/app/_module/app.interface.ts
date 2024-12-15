import { EnrolledCourseStatusType } from "./app.type";

export type UserRole = 'student' | 'admin' | 'super-admin';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  info: IUserInfo;
}

export interface IUserInfo {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  telegramUserName: string;
  avi: string | null;
  phoneNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

export interface IAccountInformationForm {
  info: Partial<IUserInfo>
}

export type TData<T> = T & { id: string };

export interface IPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ICoursePaginationParams extends IPaginationParams {
  status?: EnrolledCourseStatusType;
}

export interface IPagination<T> {
  result: TData<T>[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  previousPage: number | null;
  nextPage: number | null;
}

export interface IPaystackBank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPaystackResolveAccountNumberResponse {
  account_number: string;
  account_name: string;
  bank_id: number;
}