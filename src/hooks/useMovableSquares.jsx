import {useEffect} from "react"

export default function useMovableSquares(currentShip, boardSize) {
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
  }, [currentShip, boardSize]);
}