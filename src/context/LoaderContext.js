import React, { createContext, useState, useContext } from "react";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  return (
    <LoaderContext.Provider value={{ loaderVisible, setLoaderVisible }}>
      {children}
    </LoaderContext.Provider>
  );
};
