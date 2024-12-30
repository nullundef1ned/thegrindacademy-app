'use client';

import environmentUtil from '@/utils/env.util'
import axios, { AxiosRequestConfig } from 'axios'
import notificationUtil from '@/utils/notification.util';
import storageUtil, { StorageKey } from '@/utils/storage.util';
import { usePathname } from 'next/navigation';
import useURL from './useURL';
import { URLKeyEnum } from '@/app/_module/app.enum';

export type MessageResponse = {
  message: string
}

export type CustomError = {
  status: number,
  data?: {
    error: string[]
  },
  statusText: string,
  message: string,
  error: unknown
}

const config: AxiosRequestConfig = {
  baseURL: environmentUtil.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function useAxios() {
  const pathname = usePathname();
  const { updateParams } = useURL();
  const loginPath = pathname.startsWith('/i') ? '/i/login' : '/login';

  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.request.use((config) => {
    const token = storageUtil.getItem(StorageKey.token);

    if (token)
      config.headers['Authorization'] = `Bearer ${token}`;

    return config
  }, (error) => {
    console.error(error);
    notificationUtil.error(error);
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      const { onLine } = window.navigator;
      if (!onLine) return Promise.reject(error);

      const errorData = error.response?.data as unknown as CustomError;

      const status = Number(error.response?.status);
      const message = errorData?.message;

      if (status === 401) {
        updateParams([{ key: URLKeyEnum.LOGOUT, value: 'true' }, { key: URLKeyEnum.REDIRECT, value: pathname }], loginPath);
      } else if (status === 400) {
        const messsages = errorData.data?.error as string[];
        messsages.forEach(message => {
          notificationUtil.error(message);
        })
      } else if (status !== 404 && status !== 401 && status !== 400 && status !== 403) {
        notificationUtil.error(message || 'Something went wrong, please try again later')
      }

      return Promise.reject(errorData);
    }
  )

  return axiosInstance;
}
