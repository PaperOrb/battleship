import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import ShipPicker from "./components/ShipPicker/ShipPicker";

function App() {
  const [enemyBoardVisibility, setEnemyBoardVisibility] = useState("unhide-element");
  const [playerBoardVisibility, setPlayerBoardVisibility] = useState("hide-element");
  const [enemyShipPickerVisibility, setEnemyShipPickerVisibility] = useState("unhide-element");
  const [playerShipPickerVisibility, setPlayerShipPickerVisibility] = useState("hide-element");
  const [currentShip, setCurrentShip] = useState(false);
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
      <ShipContext.Provider
        value={{
          currentShip: currentShip,
          setCurrentShip: setCurrentShip,
          placedShips: placedShips,
          setPlacedShips: setPlacedShips,
          aiPlacedShips: aiPlacedShips,
          setAiPlacedShips: setAiPlacedShips,
        }}
      >
        <Board
          ownerProp="player"
          visibility={playerBoardVisibility}
          setPlacedShips={setPlacedShips}
          placedShips={null}
        />
        <Board
          ownerProp="cpu"
          visibility={enemyBoardVisibility}
          setPlacedShips={setAiPlacedShips}
          placedShips={aiPlacedShips}
        />

        <ShipPicker
          owner={"player"}
          visibility={playerShipPickerVisibility}
          placedShips={placedShips}
          setPlacedShips={setPlacedShips}
        />
        <ShipPicker
          owner={"cpu"}
          visibility={enemyShipPickerVisibility}
          placedShips={aiPlacedShips}
          setPlacedShips={setAiPlacedShips}
        />
      </ShipContext.Provider>
    </div>
  );
}

export default App;
export const ShipContext = React.createContext();
