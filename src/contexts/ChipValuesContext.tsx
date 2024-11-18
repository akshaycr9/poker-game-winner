// src/context/ChipValuesContext.tsx
import React, { createContext, useContext, useState } from "react";

interface Player {
  name: string;
  amount: number;
  winning: number;
}

interface ChipValuesContextType {
  chipValues: Record<string, string>;
  setChipValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
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

  const [players, setPlayers] = useState<Player[]>([]);

  return (
    <ChipValuesContext.Provider
      value={{ chipValues, setChipValues, players, setPlayers }}
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
