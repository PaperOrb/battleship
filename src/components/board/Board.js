import { useContext, useState } from "react";
import boardLogic from "./BoardLogic";
import { ShipContext } from "../../App";

export default function Board({ ownerProp, visibility }) {
  const { currentShip } = useContext(ShipContext);
  const [boardSize] = useState(7);
  const [board, setBoard] = useState(createBoard(boardSize));
  const { updateBoard, useSetMovableSquares } = boardLogic(setBoard, boardSize, currentShip);

  function createBoard(size) {
    let arr = Array(size).fill(Array(size).fill(""));

    let arrWithCoords = arr.map((row, row_ind) => {
      return row.map((element, col_ind) => {
        return { owner: ownerProp, isShip: false, isHit: false, coords: [row_ind, col_ind], isChecked: false };
      });
    });

    return arrWithCoords;
  }
  useSetMovableSquares(currentShip);

  let attackSq = (e) => {
    if (e.target.classList.contains("empty-sq")) {
      let domCoords = e.target.getAttribute("data-coords");

      updateBoard((boardEle) => {
        if (JSON.stringify(boardEle.coords) === domCoords) boardEle.isChecked = true;
        return boardEle;
      });
    }
  };

  let allowDrop = (e) => {
    e.preventDefault();
  };

  let placeShip = (e) => {
    e.preventDefault();
    let domCoords = e.target.getAttribute("data-coords");
    updateBoard((boardEle) => {
      if (JSON.stringify(boardEle.coords) === domCoords && boardEle.isMovable === true) boardEle.isShip = true;
      return boardEle;
    });
  };

  let renderSquare = (sq, key) => {
    let clickHandler;
    let squareClass = "board-square empty-sq"; // squares default to empty
    if (sq.isHit) {
      squareClass = "board-square hit-sq"; // square contains a hit ship
    } else if (sq.isShip && sq.owner === "player") {
      squareClass = "board-square friendly-sq"; // square contains a friendly ship
    } else if (sq.isChecked) {
      squareClass = "board-square checked-sq"; // square has been checked
    }
    if (sq.owner !== "player") clickHandler = attackSq;

    return (
      <div
        key={key}
        data-testid={`square${key}`}
        className={squareClass}
        onClick={clickHandler}
        data-coords={JSON.stringify(sq.coords)}
        onDragOver={allowDrop}
        onDrop={placeShip}
      ></div>
    );
  };

  let renderBoard = () => {
    let boardJSX = board.map((row, row_ind) => {
      return row.map((sq, sq_ind) => {
        let key = Number(String(row_ind) + String(sq_ind)); // row is tens place and sq is ones place
        return renderSquare(sq, key);
      });
    });

    return boardJSX;
  };

  return (
    <div key={5} className={`board ${visibility}`}>
      {renderBoard()}
    </div>
  );
}
