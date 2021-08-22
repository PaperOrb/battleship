import { useEffect, useState, useContext } from "react";
import useBoardLogic from "../../hooks/useBoardLogic";
import { BoardContext } from "../../App";
import useAIShipPlacer from "../../hooks/useAIShipPlacer";

export default function Board({ ownerProp, visibility, setPlacedShips, currentShip }) {
  const { turn, setTurn } = useContext(BoardContext);
  const [aisTurn, setAisTurn] = useState(false);
  const [boardSize] = useState(7);
  const [board, setBoard] = useState(createBoard(boardSize));
  let { placeShip, updateBoard, aiPerformAttack } = useBoardLogic(board, setBoard, setPlacedShips);

  // setup AI board
  useAIShipPlacer(currentShip, placeShip, ownerProp);

  // set movable squares when a ship is selected
  useEffect(() => {
    let sqIsMovable = (boardEle) => {
      let foreMostShipSquare;
      let aftMostShipSquare;
      if (currentShip.direction === "horizontal") {
        foreMostShipSquare = boardEle.coords[1] + currentShip.foreSquares;
        aftMostShipSquare = boardEle.coords[1] - currentShip.aftSquares;
      } else {
        foreMostShipSquare = boardEle.coords[0] + currentShip.foreSquares;
        aftMostShipSquare = boardEle.coords[0] - currentShip.aftSquares;
      }

      if (foreMostShipSquare < boardSize && aftMostShipSquare > -1) {
        boardEle.isMovable = true;
      } else {
        boardEle.isMovable = false;
      }
      return boardEle;
    };

    updateBoard(sqIsMovable);
    //eslint-disable-next-line
  }, [currentShip, boardSize]);

  function createBoard(size) {
    let arr = Array(size).fill(Array(size).fill(""));

    let arrWithCoords = arr.map((row, row_ind) => {
      return row.map((element, col_ind) => {
        return { owner: ownerProp, isShip: false, isHit: false, coords: [row_ind, col_ind], isChecked: false };
      });
    });

    return arrWithCoords;
  }

  useEffect(() => {
    console.log("ai moved:");
    console.log(aisTurn);
  }, [aisTurn]);

  let attackSq = (e) => {
    let domCoords = e.target.getAttribute("data-coords");
    setAisTurn(() => false); // the anon callback below never changes this because said callback is called async by updateBoard. i'm thinking maybe trigger aiMove with a useEffect(()=>{}, [turn]) that's inside of the board to avoid "can't update component while rendering" errors. the effect will trigger a callback in the parent to execute aiMove upon the player's board

    updateBoard((boardEle) => {
      if (JSON.stringify(boardEle.coords) !== domCoords) return boardEle; // prevents updating board elements that weren't clicked
      if (boardEle.isHit || boardEle.isChecked) return boardEle; // do nothing if player clicks previously clicked square

      if (boardEle.isShip === true) {
        boardEle.isHit = true;
      } else {
        boardEle.isChecked = true;
      }

      setTimeout(() => {
        setAisTurn(() => true);
      }, 20);

      return boardEle;
    });
    // may need to setState here, then have a useEffect listening which triggers aiPerformAttack on the proper board
    // the alternative might be
  };

  let renderSquare = (sq, key) => {
    let clickHandler;
    let nullAIShipCoords = null;
    let squareClass = "board-square empty-sq"; // squares default to empty
    if (sq.isHit) {
      squareClass = "board-square hit-sq"; // square contains a hit ship
    } else if (sq.isShip) {
      squareClass = "board-square friendly-sq"; // square contains a friendly ship
    } else if (sq.isChecked) {
      squareClass = "board-square checked-sq"; // square has been checked
    }
    if (sq.owner !== "player") clickHandler = attackSq;

    return (
      <div
        key={key}
        id={`${ownerProp}-square-${key}`}
        data-testid={`square${key}_${ownerProp}`}
        className={squareClass}
        onClick={clickHandler}
        data-coords={JSON.stringify(sq.coords)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(event) => placeShip(event, nullAIShipCoords, currentShip)}
      ></div>
    );
  };

  let renderBoard = () => {
    let boardJSX = board.map((row, row_ind) => {
      return row.map((sq, sq_ind) => {
        let key = Number(`${String(row_ind) + String(sq_ind)}`); // row is tens place and sq is ones place
        return renderSquare(sq, key);
      });
    });

    return boardJSX;
  };

  return (
    <div key={5} className={`board ${visibility}`} id={`${ownerProp}-board`}>
      {renderBoard()}
    </div>
  );
}
