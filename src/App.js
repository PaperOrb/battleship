import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import VictoryScreen from "./components/VictoryScreen/VictoryScreen";
import ShipPicker from "./components/ShipPicker/ShipPicker";

function App() {
  const [showBoards, setShowBoards] = useState(true);
  const [loadScreenVisibility, setLoadScreenVisibility] = useState("unhide-loading-screen");
  const [victoryScreenVisibility, setVictoryScreenVisibility] = useState("hide-victory-screen");
  const [enemyBoardVisibility, setEnemyBoardVisibility] = useState("unhide-element");
  const [playerBoardVisibility, setPlayerBoardVisibility] = useState("hide-element");
  const [enemyShipPickerVisibility, setEnemyShipPickerVisibility] = useState("unhide-element");
  const [playerShipPickerVisibility, setPlayerShipPickerVisibility] = useState("hide-element");
  const [currentShip, setCurrentShip] = useState(false);
  const [currentAiShip, setCurrentAiShip] = useState(false);
  const [placedShips, setPlacedShips] = useState([]);
  const [aiPlacedShips, setAiPlacedShips] = useState([]);
  const [aisTurn, setAisTurn] = useState(false);
  const [winMsg, setWinMsg] = useState("");

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

  // toggles boards to display if they dismounted
  useEffect(() => {
    if (showBoards === false) setShowBoards(true);
  }, [showBoards]);

  let declareVictory = (msg) => {
    setWinMsg(msg);
    setVictoryScreenVisibility("unhide-victory-screen");
  };

  let restartGame = () => {
    setShowBoards(false); // unmounts conditionally rendered boards to reset their state
    setLoadScreenVisibility("unhide-loading-screen");
    setVictoryScreenVisibility("hide-victory-screen");
    setEnemyBoardVisibility("unhide-element");
    setPlayerBoardVisibility("hide-element");
    setEnemyShipPickerVisibility("unhide-element");
    setPlayerShipPickerVisibility("hide-element");
    setCurrentShip(false);
    setCurrentAiShip(false);
    setPlacedShips([]);
    setAiPlacedShips([]);
    setAisTurn(false);
    setWinMsg("");
  };

  return (
    <div>
      <LoadingScreen visibility={loadScreenVisibility}></LoadingScreen>
      <VictoryScreen visibility={victoryScreenVisibility} winMsg={winMsg} restartGame={restartGame}></VictoryScreen>
      <div className="header">
        <div>Battleship</div>
      </div>
      <div className="board-container">
        <BoardContext.Provider value={{ aisTurn: aisTurn, setAisTurn: setAisTurn, declareVictory: declareVictory }}>
          {showBoards && (
            <Board
              ownerProp="player"
              visibility={playerBoardVisibility}
              setPlacedShips={setPlacedShips}
              currentShip={currentShip}
              placedShips={placedShips}
            />
          )}
          {showBoards && (
            <Board
              ownerProp="cpu"
              visibility={enemyBoardVisibility}
              setPlacedShips={setAiPlacedShips}
              currentShip={currentAiShip}
              placedShips={aiPlacedShips}
            />
          )}
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
