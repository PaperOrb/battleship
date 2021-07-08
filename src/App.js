import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import ShipPicker from "./components/ShipPicker/ShipPicker";

function App() {
  const [boardVisibility, setBoardVisibility] = useState("hide-element");
  const [shipPickerVisibility, setShipPickerVisibility] = useState("unhide-element");
  const [currentShip, setCurrentShip] = useState(false);
  const [placedShips, setPlacedShips] = useState([]);

  // const [enemyBoardIsVisible, setEnemyBoardIsVisible] = useState("hide-enemy-board");

  // Initialize game
  // useEffect(() => {
  //   // while (!board.full)
  //   //  board.placeShip();
  //   // setEnemyBoardIsVisible("show-enemy-board")
  // }, []);

  // unhides CPU board once all ships are placed
  useEffect(() => {
    if (placedShips.length === 5) {
      setBoardVisibility("unhide-element");
      setShipPickerVisibility("hide-element");
    }
  }, [placedShips]);

  return (
    <div className="board-container">
      <ShipContext.Provider
        value={{
          currentShip: currentShip,
          setCurrentShip: setCurrentShip,
          placedShips: placedShips,
          setPlacedShips: setPlacedShips,
        }}
      >
        <Board ownerProp="player" />
        <Board ownerProp="cpu" visibility={boardVisibility} />

        <ShipPicker visibility={shipPickerVisibility} />
      </ShipContext.Provider>
    </div>
  );
}

export default App;
export const ShipContext = React.createContext();
