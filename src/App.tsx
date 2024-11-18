// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewGame from "./pages/NewGame";
import AddPlayers from "./pages/AddPlayers";
import GameSession from "./pages/GameSession";
import Winnings from "./pages/Winnings";
import { routePath } from "./utils/route";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path={routePath("")} element={<NewGame />} />
        <Route path={routePath("add-players")} element={<AddPlayers />} />
        <Route path={routePath("game-session")} element={<GameSession />} />
        <Route path={routePath("winnings")} element={<Winnings />} />
      </Routes>
    </Router>
  );
}

export default App;
