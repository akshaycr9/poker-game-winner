// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewGame from "./pages/NewGame";
import AddPlayers from "./pages/AddPlayers";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<NewGame />} />
        <Route path="/add-players" element={<AddPlayers />} />
      </Routes>
    </Router>
  );
}

export default App;
