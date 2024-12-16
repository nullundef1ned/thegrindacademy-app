'use client';

import { ModalProvider } from "./modal.provider";
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
          <ModalProvider>
            {children}
          </ModalProvider>
        </ToastProvider>
      </TitleProvider>
    </TanstackQueryProvder>
  )
}
