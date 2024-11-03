// src/components/context.js
import React, { createContext, useContext, useState } from "react";

const ParameterContext = createContext();

export const ParameterProvider = ({ children }) => {
  const [parameters, setParameters] = useState({
    dielectric: 1,
    intensity: 5,
    boundaryOrientation: 0,
  });

  const handleParameterChange = (key, value) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ParameterContext.Provider value={{ parameters, handleParameterChange }}>
      {children}
    </ParameterContext.Provider>
  );
};

export const useParameters = () => useContext(ParameterContext);
