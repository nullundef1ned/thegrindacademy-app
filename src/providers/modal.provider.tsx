
import React, { useState, useEffect, ReactNode, createContext, Fragment, useContext, Context } from "react";

type ModalContextType = {
  showModal: (modal: ReactNode) => void;
  hideModal: () => void;
  hideAllModals: () => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

const ModalContext: Context<ModalContextType> = createContext({
  showModal: (modal: ReactNode) => { if (!modal) throw new Error("Modal is required") },
  hideModal: () => { },
  hideAllModals: () => { },
});

export const useModal = () => {
  return useContext(ModalContext);
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ReactNode[]>([]);

  const showModal = (modal: ReactNode) => {
    setModals((prevModals) => [...prevModals, modal]);
  };

  const hideModal = () => {
    setModals((prevModals) => prevModals.slice(0, -1));
  };

  const hideAllModals = () => {
    setModals([]);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.keyCode === 27 && modals.length > 0) {
        hideAllModals();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [modals]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal, hideAllModals }}>
      <div>
        {modals.map((modal, index) => (
          <Fragment key={index}>{modal}</Fragment>
        ))}
      </div>
      {children}
    </ModalContext.Provider>
  );
};

