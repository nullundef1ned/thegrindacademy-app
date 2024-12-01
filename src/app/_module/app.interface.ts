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

export type TData<T> = T & { id: string };

export interface IPagination<T> {
  result: TData<T>[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  previousPage: number | null;
  nextPage: number | null;
}