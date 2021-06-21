import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import ShipPicker from "./components/ShipPicker";

function App() {
  const [boardVisibility, setBoardVisibility] = useState("hide-board");
  const [shipsArePlaced, setShipsArePlaced] = useState("hide-board");
  const [placingShip, setPlacingShip] = useState(false);

  useEffect(() => {
    console.log("placing ship!");
  }, [placingShip]);

  // const [player, setPlayer] = useState(player.create("player"));

  // const [enemy, setEnemy] = useState(player.create("cpu"));
  // const [enemyBoardIsVisible, setEnemyBoardIsVisible] = useState("hide-enemy-board");

  // Initialize game
  // useEffect(() => {
  //   // while (!board.full)
  //   //  board.placeShip();
  //   // setEnemyBoardIsVisible("show-enemy-board")
  // }, []);

  // unhides CPU board once all ships are placed
  useEffect(() => {
    console.log("all ships placed!");
  }, [shipsArePlaced]);

  return (
    <ShipContext.Provider value={{ placingShip: placingShip, setPlacingShip: setPlacingShip }}>
      <div className="board-container">
        <Board ownerProp="player" />
        <Board ownerProp="cpu" visibility={boardVisibility} />
        <ShipPicker />
      </div>
    </ShipContext.Provider>
  );
}

export default App;
export const ShipContext = React.createContext();
