import { useEffect, useState } from "react";

const boardLogic = (({board, setBoard}) => {


  let updateBoard = (setBoard, callBack) => {
    setBoard((prevBoard) => {
      let newBoard = prevBoard.map((row) => {
        return row.map((arrEle) => {
          return callBack(arrEle);
        });
      });

      return newBoard;
    });
  };

  let useSetMovableSquares = (currentShip, boardSize, setBoard) => {
    useEffect(() => {
      let sqIsMovable = (boardEle) => {
        let xRightSideCoord = boardEle.coords[1] + currentShip.squaresAfter;
        let xLeftSideCoord = boardEle.coords[1] - currentShip.squaresBefore;
        let yBottomSideCoord = boardEle.coords[1] + currentShip.squaresAfter;
        let yTopSideCoord = boardEle.coords[1] - currentShip.squaresBefore;

        if (xRightSideCoord < boardSize && xLeftSideCoord > -1) {
          boardEle.isMovable = true;
        } else {
          boardEle.isMovable = false;
        }

        return boardEle;
      };

      updateBoard(setBoard, sqIsMovable);
    }, [currentShip, boardSize]);
  };

  return { updateBoard, useSetMovableSquares };
})();

export default boardLogic;
