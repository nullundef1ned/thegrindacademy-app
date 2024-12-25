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

      // && (environmentUtil.ENVIRONMENT == 'dev' && status == 400)

      if (status === 401) {
        updateParams([{ key: URLKeyEnum.LOGOUT, value: 'true' }, { key: URLKeyEnum.REDIRECT, value: pathname }], '/login');
        // notificationUtil.error(message || 'Session expired. Please login again.');
      } else if (status !== 404 && status !== 401 && status !== 400) {
        notificationUtil.error(message || 'Something went wrong, please try again later')
      }

      return Promise.reject(errorData);
    }
  )

  return axiosInstance;
}
