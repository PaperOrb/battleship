import React, { useState, useEffect } from "react";
import Board from "./components/board/Board";
import boardLogic from "./components/board/BoardLogic";
import ShipPicker from "./components/ships/ShipPicker";

function App() {
  const [boardVisibility, setBoardVisibility] = useState("hide-board");
  const [shipsArePlaced, setShipsArePlaced] = useState("hide-board");
  const [currentShip, setCurrentShip] = useState(false);


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
  useEffect(() => {}, [shipsArePlaced]);

  return (
    <div className="board-container">
      <ShipContext.Provider
        value={{
          currentShip: currentShip,
          setCurrentShip: setCurrentShip,
          boardLogic: boardLogic(setBoard, boardSize, currentShip, setCurrentShip),
          board: board,
          setBoard: setBoard,
        }}
      >
        <Board ownerProp="player" />
        <Board ownerProp="cpu" visibility={boardVisibility} />

        <ShipPicker />
      </ShipContext.Provider>
    </div>
  );
}

export default App;
export const ShipContext = React.createContext();
