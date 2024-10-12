'use client';

import React, { useEffect } from 'react'

type TitleProviderProps = {
  children: React.ReactNode;
};

type TitleContextType = {
  setTitle: (title: string) => void;
  removeTitle: () => void;
};

const pageContext: TitleContextType = {
  setTitle: () => { },
  removeTitle: () => { }
};

export const useTitle = () => {
  return React.useContext(TitleContext);
};

export const TitleContext =
  React.createContext<TitleContextType>(pageContext);

export default function TitleProvider({ children }: TitleProviderProps) {
  const [title, setTitle] = React.useState<string>("");

  const generateTitle = (title: string) => {
    return `${title} | The Grind Academy`;
  }

  const context = {
    setTitle: (title: string) => setTitle(generateTitle(title)),
    removeTitle: () => setTitle("")
  }

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <TitleContext.Provider value={context}>
      {children}
    </TitleContext.Provider>
  );
}