// src/components/context.js
import React, { createContext, useContext, useState } from "react";

const ParameterContext = createContext();

export const ParameterProvider = ({ children }) => {
  const [parameters, setParameters] = useState({
    amplitudeX: 1.5,
    amplitudeY: 1.5,
    phase_diff: 90,
    frequency:0.1,
    mfield:0 ,
    efield:1,
    wavelength:4,
    eta:1
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
