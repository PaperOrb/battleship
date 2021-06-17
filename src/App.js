import { useState, useEffect } from "react";
import Board from "./components/Board";

function App() {
  // const [player, setPlayer] = useState(player.create("player"));

  // const [enemy, setEnemy] = useState(player.create("cpu"));
  // const [enemyBoardIsVisible, setEnemyBoardIsVisible] = useState("hide-enemy-board");

  // Initialize game
  // useEffect(() => {
  //   // while (!board.full)
  //   //  board.placeShip();
  //   // setEnemyBoardIsVisible("show-enemy-board")
  // }, []);

  return (
    <div className="board-container">
      <Board ownerProp="player" />
      <Board ownerProp="cpu" />
    </div>
  );
}

export default App;
