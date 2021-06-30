import { useEffect } from "react";

const boardLogic = (setBoard, boardSize, currentShip) => {
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

  let useSetMovableSquares = () => {
    useEffect(() => {
      let sqIsMovable = (boardEle) => {
        let xRightSideCoord = boardEle.coords[1] + currentShip.squaresAfter;
        let xLeftSideCoord = boardEle.coords[1] - currentShip.squaresBefore;
        let yBottomSideCoord = boardEle.coords[1] + currentShip.squaresAfter;
        let yTopSideCoord = boardEle.coords[1] - currentShip.squaresBefore;

        if (xRightSideCoord < boardSize && xLeftSideCoord > -1) {
          // replace this placeholder condition with a proper one
          boardEle.isMovable = true;
        } else {
          boardEle.isMovable = false;
        }

        return boardEle;
      };

      updateBoard(sqIsMovable);
    }, [currentShip]);
  };

  return { updateBoard, useSetMovableSquares };
};

export default boardLogic;
