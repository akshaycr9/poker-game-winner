// src/pages/AddPlayers.tsx
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { usePlayers } from "../contexts/PlayersContext";
import { routePath } from "../utils/route";

const AddPlayers: React.FC = () => {
  const navigate = useNavigate();
  const { players, addPlayer } = usePlayers();
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleAddPlayer = () => {
    if (name.trim() && amount > 0) {
      addPlayer({ name, amount: Number(-amount), winning: 0 });
      setName("");
      setAmount(0);
    }
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      const confirmStart = window.confirm(
        "Are you sure you want to start the game?"
      );
      if (confirmStart) {
        console.log("Game started with players:", players);
        // Navigate to the next step (you can use react-router's useNavigate here)
        navigate(routePath("game-session"));
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">Add Players</h1>
      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter player name"
            />
            <Input
              label="Amount Taken"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>
          <Button
            onClick={handleAddPlayer}
            disabled={!name.trim() || amount <= 0}
          >
            Add Player
          </Button>
        </div>
        <div className="space-y-2">
          {players.map((player, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-gray-300 p-2 rounded"
            >
              <span>{player.name}</span>
              <span>{player.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={handleStartGame}
        disabled={players.length < 2}
        className="w-full max-w-md"
      >
        Start Game
      </Button>
    </div>
  );
};

export default AddPlayers;
