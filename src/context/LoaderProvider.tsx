// src/context/LoaderContext.tsx
import React, { createContext, useContext, useState } from "react";
import Loader from "../components/common/Loader";

interface LoaderContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading&&<Loader />}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoaderProvider");
  }
  return context;
};
