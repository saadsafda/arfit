import React, { createContext, useContext, useState } from "react";

interface ARfittContextType {
  email: string;
  setEmail: (email: string) => void;
}

const ARfittContext = createContext<ARfittContextType | any>(undefined);

export const useARfittContext = () => {
  const context = useContext(ARfittContext);
  if (!context) {
    throw new Error("useARfittContext must be used within a ARfittProvider");
  }
  return context;
};

export const ARfittProvider: React.FC<any> = ({ children }) => {
  const [email, setEmail] = useState<string>("");

  const value: ARfittContextType = {
    email,
    setEmail,
  };

  return (
    <ARfittContext.Provider value={value}>{children}</ARfittContext.Provider>
  );
};
