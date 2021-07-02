import { useEffect } from "react";

const boardLogic = (setBoard, boardSize, currentShip, setCurrentShip) => {
  // sets ship object when a ship is dragged/clicked
  let setupShip = (e) => {
    let clickedShipSq = Number(e.target.getAttribute("data-num"));
    let length = Number(e.target.getAttribute("data-length"));

    let sqsAfter = length - clickedShipSq;
    let sqsBefore = clickedShipSq - 1;
    let ship = { name: e.target.id, index: clickedShipSq, squaresBefore: sqsBefore, squaresAfter: sqsAfter };
    setCurrentShip(ship);
  };

  let dragShip = (event) => {
    event.dataTransfer.setData("ship", JSON.stringify(currentShip));
  };

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

  return { updateBoard, useSetMovableSquares, setupShip, dragShip };
};

export default boardLogic;
