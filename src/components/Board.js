import { useEffect, useState } from "react";

export default function Board({ ownerProp }) {
  const [owner, setOwner] = useState(ownerProp);
  const [board, setBoard] = useState(createBoard(7));

  function createBoard(size) {
    let arr = Array(size).fill(Array(size).fill(""));

    let arrWithCoords = arr.map((row, row_ind) => {
      return row.map((element, col_ind) => {
        return { owner: ownerProp, isShip: false, isHit: false, coords: [row_ind, col_ind] };
      });
    });

    return arrWithCoords;
  }

  let handleBoardInput = (e) => {
    // let square = target
    // if (square.hit) return
    //
  };

  let renderSquare = (sq) => {
    let hitSq = <div className="board-square hit-sq"></div>;
    let shipSq = <div className="board-square friendly-sq"></div>;
    let emptySq = <div className="board-square empty-sq" onClick={handleBoardInput}></div>;

    if (sq.isHit) return hitSq; // hit ship
    if (sq.isShip && sq.owner === "player") return shipSq; // friendly ship
    return emptySq; // no ship
  };

  let renderBoard = () => {
    let boardJSX = board.map((row) => {
      return row.map((sq) => {
        return renderSquare(sq);
      });
    });

    return boardJSX;
  };

  return <div className="board">{renderBoard()}</div>;
}
