"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UserType = {
  email: string;
  nickname: string;
  is_active: boolean;
};

interface MyContextType {
  state: UserType | undefined;
  setState: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}

interface MyProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<MyContextType | undefined>(undefined);

export function GlobalProvider({ children }: MyProviderProps) {
  const [state, setState] = useState<UserType | undefined>();

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
}
