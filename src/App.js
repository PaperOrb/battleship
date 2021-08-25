import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ShipPicker from "./components/ShipPicker/ShipPicker";

function App() {
  const [loadScreenVisibility, setLoadScreenVisibility] = useState("unhide-loading-screen");
  const [enemyBoardVisibility, setEnemyBoardVisibility] = useState("unhide-element");
  const [playerBoardVisibility, setPlayerBoardVisibility] = useState("hide-element");
  const [enemyShipPickerVisibility, setEnemyShipPickerVisibility] = useState("unhide-element");
  const [playerShipPickerVisibility, setPlayerShipPickerVisibility] = useState("hide-element");
  const [currentShip, setCurrentShip] = useState(false);
  const [currentAiShip, setCurrentAiShip] = useState(false);
  const [placedShips, setPlacedShips] = useState([]);
  const [aiPlacedShips, setAiPlacedShips] = useState([]);
  const [aisTurn, setAisTurn] = useState(false);

  // remove load screen
  useEffect(() => {
    if (aiPlacedShips.length === 5) {
      setLoadScreenVisibility("hide-loading-screen");
    }
  }, [aiPlacedShips]);

  // display enemy board
  useEffect(() => {
    if (placedShips.length === 5) {
      setEnemyBoardVisibility("unhide-element");
      setPlayerShipPickerVisibility("hide-element");
    }
  }, [placedShips]);

  // display player board
  useEffect(() => {
    if (aiPlacedShips.length === 5) {
      setPlayerBoardVisibility("unhide-element");
      setPlayerShipPickerVisibility("unhide-element");
      setEnemyShipPickerVisibility("hide-element");
      setEnemyBoardVisibility("hide-element");
    }
  }, [aiPlacedShips]);

  return (
    <div>
      <LoadingScreen visibility={loadScreenVisibility}></LoadingScreen>

      <div className="board-container">
        <BoardContext.Provider value={{ aisTurn: aisTurn, setAisTurn: setAisTurn }}>
          <Board
            ownerProp="player"
            visibility={playerBoardVisibility}
            setPlacedShips={setPlacedShips}
            currentShip={currentShip}
            placedShips={placedShips}
          />
          <Board
            ownerProp="cpu"
            visibility={enemyBoardVisibility}
            setPlacedShips={setAiPlacedShips}
            currentShip={currentAiShip}
            placedShips={aiPlacedShips}
          />
        </BoardContext.Provider>

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
    </div>
  );
}

export default App;
export const BoardContext = React.createContext({});
