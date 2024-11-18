import React, { createContext, useContext, useState } from "react";

interface ChipValuesContextType {
  chipValues: Record<string, string>;
  setChipValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  resetChipValues: () => void;
}

const ChipValuesContext = createContext<ChipValuesContextType | undefined>(
  undefined
);

export const ChipValuesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chipValues, setChipValues] = useState<Record<string, string>>({
    black: "",
    red: "",
    white: "",
    green: "",
  });

  const resetChipValues = () => {
    setChipValues({
      black: "",
      red: "",
      white: "",
      green: "",
    });
  };

  return (
    <ChipValuesContext.Provider
      value={{
        chipValues,
        setChipValues,
        resetChipValues,
      }}
    >
      {children}
    </ChipValuesContext.Provider>
  );
};

export const useChipValuesContext = () => {
  const context = useContext(ChipValuesContext);
  if (!context) {
    throw new Error(
      "useChipValuesContext must be used within a ChipValuesProvider"
    );
  }
  return context;
};
