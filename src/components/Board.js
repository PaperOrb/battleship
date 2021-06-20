import { useEffect, useState } from "react";

export default function Board({ ownerProp, visibility }) {
  const [owner, setOwner] = useState(ownerProp);
  const [board, setBoard] = useState(createBoard(7));

  function createBoard(size) {
    let arr = Array(size).fill(Array(size).fill(""));

    let arrWithCoords = arr.map((row, row_ind) => {
      return row.map((element, col_ind) => {
        return { owner: ownerProp, isShip: false, isHit: false, coords: [row_ind, col_ind], isChecked: false };
      });
    });

    return arrWithCoords;
  }

  // updates board with the modified squares returned from callBack
  let updateBoard = (callBack) => {
    setBoard((prevBoard) => {
      let newBoard = prevBoard.map((row) => {
        return row.map((arrEle) => {
          return callBack(arrEle);
        });
      });

      return newBoard;
    });
  };

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
    let coordsAsStr = e.target.getAttribute("data-coords");

    updateBoard((boardEle) => {
      if (JSON.stringify(boardEle.coords) === coordsAsStr) boardEle.isShip = true;
      return boardEle;
    });

    e.preventDefault();
  };

  let renderSquare = (sq, key) => {
    let clickHandler;
    let squareClass = "board-square empty-sq"; // squares default to empty
    if (sq.isHit) squareClass = "board-square hit-sq"; // hit ship
    if (sq.isChecked) squareClass = "board-square checked-sq"; // square already checked
    if (sq.isShip && sq.owner === "player") squareClass = "board-square friendly-sq"; // friendly ship
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
