export default function useBoardLogic(board, setBoard, setPlacedShips) {
  let placeShip = (event, aiPickedSq, currentShip) => {
    let coords;
    if (event) {
      event.preventDefault();
      let playerSqCoords = event.target.getAttribute("data-coords");
      coords = JSON.parse(playerSqCoords);
    } else {
      let aiSqCoords = aiPickedSq.getAttribute("data-coords");
      coords = JSON.parse(aiSqCoords);
    }

    let row = coords[0];
    let col = coords[1];
    if (board[row][col].isMovable === false) return false;

    let aftSquares = generateShipCoords([...coords], currentShip.aftSquares, currentShip.direction, -1);
    let foreSquares = generateShipCoords([...coords], currentShip.foreSquares, currentShip.direction, 1);
    let occupiedShipSquares = [[...coords]].concat(aftSquares.concat(foreSquares));
    let obstructions = occupiedShipSquares.some((domCoordInt) => {
      let row = domCoordInt[0];
      let col = domCoordInt[1];
      return board[row][col].isShip === true;
    });

    if (obstructions) {
      return false;
    } else {
      setPlacedShips((prevPlacedShips) => {
        return [...prevPlacedShips, currentShip.name];
      });
    }

    updateBoard((boardEle) => {
      occupiedShipSquares.forEach((domCoordInt) => {
        let coordString = JSON.stringify(domCoordInt);
        if (JSON.stringify(boardEle.coords) === coordString) boardEle.isShip = true;
      });
      return boardEle;
    });
    return true;
  };

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

  let generateShipCoords = (copyOfClickedShipSq, squaresCount, shipDirection, aftOrForeSquares) => {
    let direction = shipDirection === "horizontal" ? 1 : 0;
    let occupiedSquares = [];
    for (; squaresCount > 0; --squaresCount) {
      copyOfClickedShipSq[direction] += aftOrForeSquares;
      occupiedSquares.push([...copyOfClickedShipSq]);
    }
    return occupiedSquares;
  };

  return { placeShip, updateBoard };
}
