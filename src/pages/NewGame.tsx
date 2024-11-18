import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useChipValuesContext } from "../contexts/ChipValuesContext";
import { useNavigate } from "react-router-dom";

const NewGame: React.FC = () => {
  const { chipValues, setChipValues } = useChipValuesContext();
  const navigate = useNavigate();

  const isFormValid = Object.values(chipValues).every(
    (value) => value !== "" && Number(value) > 0
  );

  const handleInputChange = (color: string, value: string) => {
    setChipValues((prev) => ({ ...prev, [color]: value }));
  };

  const handleAddPlayers = () => {
    console.log("Chip Values Stored in Context:", chipValues);
    navigate("/add-players");
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">New Game</h1>
      <div className="w-full max-w-md space-y-4">
        {["black", "red", "white", "green"].map((color) => (
          <Input
            key={color}
            label={color.charAt(0).toUpperCase() + color.slice(1)}
            value={chipValues[color as keyof typeof chipValues]}
            onChange={(e) => handleInputChange(color, e.target.value)}
            placeholder={`Enter value for ${color}`}
          />
        ))}
      </div>
      <Button
        onClick={handleAddPlayers}
        disabled={!isFormValid}
        className="mt-4 w-full max-w-md"
      >
        Add Players
      </Button>
    </div>
  );
};

export default NewGame;
