// src/pages/GameSession.tsx
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { usePlayers } from "../contexts/PlayersContext";
import { useNavigate } from "react-router-dom";

const GameSession: React.FC = () => {
  const { players, updatePlayerAmount, addPlayer } = usePlayers();
  const [borrower, setBorrower] = useState("");
  const [lender, setLender] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [showPopup, setShowPopup] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerAmount, setNewPlayerAmount] = useState<number>(0);
  const [transactions, setTransactions] = useState<string[]>([]);
  const [newPlayerSource, setNewPlayerSource] = useState<string>("Bank");

  const navigate = useNavigate();

  const totalBank = Math.abs(
    players.reduce((sum, player) => sum + player.amount, 0)
  );

  const handleBorrow = () => {
    if (borrower && lender && amount > 0) {
      if (lender === "Bank") {
        updatePlayerAmount(borrower, "", Number(amount));
        setTransactions((prev) => [
          ...prev,
          `${borrower} borrowed amount ${amount} from Bank`,
        ]);
      } else {
        updatePlayerAmount(borrower, lender, Number(amount));
        setTransactions((prev) => [
          ...prev,
          `${borrower} borrowed amount ${amount} from ${lender}`,
        ]);
      }
    }
    setBorrower("");
    setLender("");
    setAmount(0);
  };

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerAmount > 0) {
      // Update amounts based on the selected source
      if (newPlayerSource === "Bank") {
        updatePlayerAmount(newPlayerName, "", Number(newPlayerAmount));
      } else {
        updatePlayerAmount(
          newPlayerName,
          newPlayerSource,
          Number(newPlayerAmount)
        );
      }

      // Add the new player to the list
      addPlayer({
        name: newPlayerName,
        amount: Number(-newPlayerAmount),
        winning: 0,
      });

      // Add transaction to logs
      setTransactions((prev) => [
        ...prev,
        `${newPlayerName} borrowed amount ${newPlayerAmount} from ${newPlayerSource}`,
      ]);

      // Reset popup fields
      setNewPlayerName("");
      setNewPlayerAmount(0);
      setNewPlayerSource("Bank");
      setShowPopup(false);
    }
  };

  const handleEndGame = () => {
    const confirmEnd = window.confirm("Are you sure you want to end the game?");
    if (confirmEnd) {
      console.log("Game ended with players:", players);
      // Navigate to the final calculation step
      navigate("/winnings");
    }
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Game Session</h1>

      {/* Total Bank */}
      <div className="text-lg font-medium">Total Bank: {totalBank}</div>

      {/* Borrow Section */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <select
            className="border rounded px-3 py-2"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
          >
            <option value="">Select Borrower</option>
            {players.map((player) => (
              <option key={player.name} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2"
            value={lender}
            onChange={(e) => setLender(e.target.value)}
          >
            <option value="">Select Lender</option>
            <option value="Bank">Bank</option>
            {players.map((player) => (
              <option key={player.name} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />
        <Button
          onClick={handleBorrow}
          disabled={!borrower || !lender || amount <= 0}
        >
          Create Entry
        </Button>
      </div>

      {/* Borrowing Transactions */}
      <div className="space-y-4 mt-6">
        <h2 className="text-lg font-bold">Borrowing Transactions</h2>
        {transactions.length > 0 ? (
          <ul className="list-disc pl-5">
            {transactions.map((transaction, index) => (
              <li key={index} className="text-gray-700">
                {transaction}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No transactions yet.</p>
        )}
      </div>

      {/* List of Players */}
      <div className="space-y-2 mt-6">
        <h2 className="text-lg font-bold">Players</h2>
        {players.map((player) => (
          <div
            key={player.name}
            className="flex justify-between items-center border rounded px-3 py-2"
          >
            <span>{player.name}</span>
            <span>{player.amount}</span>
          </div>
        ))}
      </div>

      {/* Add User */}
      <Button onClick={() => setShowPopup(true)}>Add New User</Button>

      {/* End Game */}
      <Button onClick={handleEndGame} className="bg-red-500">
        End Game
      </Button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Add New User</h2>
            <Input
              label="Player Name"
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter player name"
            />
            <Input
              label="Amount"
              type="number"
              value={newPlayerAmount}
              onChange={(e) => setNewPlayerAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
            <select
              className="border rounded px-3 py-2 w-full mt-2"
              value={newPlayerSource}
              onChange={(e) => setNewPlayerSource(e.target.value)}
            >
              <option value="Bank">Bank</option>
              {players.map((player) => (
                <option key={player.name} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddPlayer}>Add</Button>
              <Button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSession;
