import React, { createContext, useContext, useState } from "react";

interface ChipValues {
  black: string;
  red: string;
  white: string;
  green: string;
}

interface ChipValuesContextType {
  chipValues: ChipValues;
  setChipValues: React.Dispatch<React.SetStateAction<ChipValues>>;
}

const ChipValuesContext = createContext<ChipValuesContextType | undefined>(
  undefined
);

export const ChipValuesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chipValues, setChipValues] = useState<ChipValues>({
    black: "",
    red: "",
    white: "",
    green: "",
  });

  return (
    <ChipValuesContext.Provider value={{ chipValues, setChipValues }}>
      {children}
    </ChipValuesContext.Provider>
  );
};

export const useChipValuesContext = (): ChipValuesContextType => {
  const context = useContext(ChipValuesContext);
  if (!context) {
    throw new Error(
      "useChipValuesContext must be used within a ChipValuesProvider"
    );
  }
  return context;
};
