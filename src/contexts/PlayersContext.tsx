import { createContext, useContext, useState, ReactNode } from "react";

type Player = {
  name: string;
  amount: number;
  winning: number;
};

type PlayersContextType = {
  players: Player[];
  addPlayer: (player: Player) => void;
  updatePlayerWinnings: (name: string, winnings: number) => void;
  updatePlayerAmount: (
    borrower: string,
    lender: string,
    amount: number
  ) => void;
  resetPlayers: () => void;
};

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  // Add a new player
  const addPlayer = (newPlayer: Player) => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  // Update the winnings of a player
  const updatePlayerWinnings = (name: string, winnings: number) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.name === name ? { ...player, winning: winnings } : player
      )
    );
  };

  // Update the amount for a player
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

  // Reset all players
  const resetPlayers = () => {
    setPlayers([]);
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        addPlayer,
        updatePlayerWinnings,
        updatePlayerAmount,
        resetPlayers,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

// Hook for accessing the Players context
export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
};
