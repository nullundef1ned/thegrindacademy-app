import React from 'react'
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

type TanstackQueryProviderProps = {
  children: React.ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    }
  }
});

const persister = createSyncStoragePersister({
  storage: (typeof window !== 'undefined') ? window.localStorage : null,
})

export default function TanstackQueryProvder({ children }: TanstackQueryProviderProps) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
      <ReactQueryDevtools />
    </PersistQueryClientProvider>
  )
}