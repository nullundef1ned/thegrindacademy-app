'use client';

import TanstackQueryProvder from "./tanstack-query.provder";
import TitleProvider from "./title.provider";
import ToastProvider from "./toast.provider";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <TanstackQueryProvder>
      <TitleProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </TitleProvider>
    </TanstackQueryProvder>
  )
}
