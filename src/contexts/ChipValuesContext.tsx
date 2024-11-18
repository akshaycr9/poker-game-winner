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
  updatePlayerAmount: (
    borrower: string,
    lender: string,
    amount: number
  ) => void;
  addPlayer: (newPlayer: Player) => void;
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

  const updatePlayerAmount = (
    borrower: string,
    lender: string,
    amount: number
  ) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player.name === borrower) {
          return { ...player, amount: player.amount - amount };
        } else if (player.name === lender) {
          return { ...player, amount: player.amount + amount };
        }
        return player;
      })
    );
  };

  const addPlayer = (newPlayer: Player) => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  return (
    <ChipValuesContext.Provider
      value={{
        chipValues,
        setChipValues,
        players,
        setPlayers,
        updatePlayerAmount,
        addPlayer,
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
