import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import ShipPicker from "./components/ShipPicker/ShipPicker";

function App() {
  const [enemyBoardVisibility, setEnemyBoardVisibility] = useState("unhide-element");
  const [playerBoardVisibility, setPlayerBoardVisibility] = useState("hide-element");
  const [enemyShipPickerVisibility, setEnemyShipPickerVisibility] = useState("unhide-element");
  const [playerShipPickerVisibility, setPlayerShipPickerVisibility] = useState("hide-element");
  const [currentShip, setCurrentShip] = useState(false);
  const [currentAiShip, setCurrentAiShip] = useState(false);
  const [placedShips, setPlacedShips] = useState([]);
  const [aiPlacedShips, setAiPlacedShips] = useState([]);

  useEffect(() => {
    if (placedShips.length === 5) {
      setEnemyBoardVisibility("unhide-element");
      setPlayerShipPickerVisibility("hide-element");
    }
  }, [placedShips]);

  useEffect(() => {
    if (aiPlacedShips.length === 5) {
      setPlayerBoardVisibility("unhide-element");
      setPlayerShipPickerVisibility("unhide-element");
      setEnemyShipPickerVisibility("hide-element");
      setEnemyBoardVisibility("hide-element");
    }
  }, [aiPlacedShips]);

  return (
    <div className="board-container">
      <Board
        ownerProp="player"
        visibility={playerBoardVisibility}
        setPlacedShips={setPlacedShips}
        currentShip={currentShip}
      />
      <Board
        ownerProp="cpu"
        visibility={enemyBoardVisibility}
        setPlacedShips={setAiPlacedShips}
        currentShip={currentAiShip}
      />

      <ShipPicker
        owner={"player"}
        visibility={playerShipPickerVisibility}
        placedShips={placedShips}
        setPlacedShips={setPlacedShips}
        currentShip={currentShip}
        setCurrentShip={setCurrentShip}
      />
      <ShipPicker
        owner={"cpu"}
        visibility={enemyShipPickerVisibility}
        placedShips={aiPlacedShips}
        setPlacedShips={setAiPlacedShips}
        currentShip={currentAiShip}
        setCurrentShip={setCurrentAiShip}
      />
    </div>
  );
}

export default App;
export const ShipContext = React.createContext();
