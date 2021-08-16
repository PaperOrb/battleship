import { useEffect, useContext, useState } from "react";
import { ShipContext } from "../../App";
import useBoardLogic from "../../hooks/useBoardLogic";
import useAIShipPlacer from "../../hooks/useAIShipPlacer";

export default function Board({ ownerProp, visibility, setPlacedShips, aiPlacedShips }) {
  const [boardSize] = useState(7);
  const [board, setBoard] = useState(createBoard(boardSize));
  const { currentShip } = useContext(ShipContext);
  let { placeShip, updateBoard } = useBoardLogic(board, setBoard, setPlacedShips);

  useAIShipPlacer(currentShip, aiPlacedShips, placeShip, ownerProp );

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

  let attackSq = (e) => {
    if (e.target.classList.contains("empty-sq")) {
      let domCoords = e.target.getAttribute("data-coords");

      updateBoard((boardEle) => {
        if (JSON.stringify(boardEle.coords) !== domCoords) return boardEle; // update to work with .isHit
        if (boardEle.isShip === true) {
          boardEle.isHit = true;
        } else {
          boardEle.isChecked = true;
        }

        return boardEle;
      });
    }
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
    // if (sq.owner !== "player") clickHandler = attackSq;

    return (
      <div
        key={key}
        id={`${ownerProp}-square-${key}`}
        data-testid={`square${key}_${ownerProp}`}
        className={squareClass}
        onClick={clickHandler}
        data-coords={JSON.stringify(sq.coords)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(event) => placeShip(event, nullAIShipCoords, currentShip, setPlacedShips, updateBoard)}
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
