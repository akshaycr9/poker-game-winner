import { useState } from "react";
import { useChipValuesContext } from "../contexts/ChipValuesContext";
import { usePlayers } from "../contexts/PlayersContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { routePath } from "../utils/route";

const Winnings = () => {
  const { chipValues, resetChipValues } = useChipValuesContext();
  const { players, updatePlayerWinnings, resetPlayers } = usePlayers();
  const navigate = useNavigate();

  // State to track color counts
  const [colorCounts, setColorCounts] = useState<
    Record<string, Record<string, number>>
  >(
    players.reduce((acc, player) => {
      acc[player.name] = { black: 0, red: 0, white: 0, green: 0 };
      return acc;
    }, {} as Record<string, Record<string, number>>)
  );

  // State to store calculated total winnings
  const [totalWinnings, setTotalWinnings] = useState<Record<
    string,
    number
  > | null>(null);

  // Function to handle color count changes
  const handleColorCountChange = (
    playerName: string,
    color: string,
    value: number
  ) => {
    setColorCounts((prev) => ({
      ...prev,
      [playerName]: {
        ...prev[playerName],
        [color]: value,
      },
    }));
  };

  // Calculate winnings for individual user
  const calculateWinnings = (playerName: string) => {
    const counts = colorCounts[playerName];
    const totalValue =
      counts.black * Number(chipValues.black) +
      counts.red * Number(chipValues.red) +
      counts.white * Number(chipValues.white) +
      counts.green * Number(chipValues.green);
    const winnings = totalValue / 2;

    updatePlayerWinnings(playerName, winnings);
  };

  // Calculate total winnings for all users
  const calculateTotalWinnings = () => {
    const totals = players.reduce((acc, player) => {
      acc[player.name] = player.amount + player.winning;
      return acc;
    }, {} as Record<string, number>);

    setTotalWinnings(totals);
  };

  // Reset game state
  const resetGame = () => {
    resetChipValues();
    resetPlayers();
    navigate(routePath(""));
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold text-center">Winnings</h1>
      <div className="space-y-4">
        {players.map((player) => (
          <div
            key={player.name}
            className="border p-4 rounded shadow space-y-2"
          >
            <h2 className="text-lg font-semibold">{player.name}</h2>
            <div className="grid grid-cols-4 gap-2">
              {["black", "red", "white", "green"].map((color) => (
                <div key={color} className="flex flex-col">
                  <label className="text-sm capitalize">{color}</label>
                  <Input
                    label="Count"
                    type="number"
                    value={colorCounts[player.name][color]}
                    onChange={(e) =>
                      handleColorCountChange(
                        player.name,
                        color,
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <Button
              onClick={() => calculateWinnings(player.name)}
              className="mt-2"
            >
              Calculate Winnings
            </Button>
            <div className="mt-2 text-sm text-gray-600">
              Winnings:{" "}
              {players.find((p) => p.name === player.name)?.winning ?? 0}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => {
          const totals = calculateTotalWinnings();
          console.log("Total Winnings: ", totals);
        }}
        className="w-full mt-6"
      >
        Calculate Total Winnings
      </Button>

      {totalWinnings && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-center">Total Winnings</h2>
          <table className="w-full border border-gray-300 mt-2">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-300 text-left">Player</th>
                <th className="p-2 border border-gray-300 text-left">
                  Total Winnings
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(totalWinnings).map(([name, total]) => (
                <tr key={name}>
                  <td className="p-2 border border-gray-300">{name}</td>
                  <td className="p-2 border border-gray-300">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Button onClick={resetGame} className="w-full mt-6 bg-red-500">
        Start New Game
      </Button>
    </div>
  );
};

export default Winnings;
