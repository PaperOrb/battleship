// setup aiplacer to call this directly, and dictate control flow based on whether the spot is movable+obstructed

export default function useBoardLogic() {
  let placeShip = ({ event, aiPickedSq, board, currentShip, setPlacedShips, updateBoard }) => {
    let coords;
    if (event) {
      event.preventDefault();
      let playerSqCoords = event.target.getAttribute("data-coords");
      console.log(playerSqCoords);
      coords = JSON.parse(playerSqCoords);
    } else {
      let aiSqCoords = aiPickedSq.getAttribute("data-coords");
      coords = JSON.parse(aiSqCoords);
    }

    let row = coords[0];
    let col = coords[1];
    // console.log(JSON.stringify(currentShip)); // why is this false?

    if (board[row][col].isMovable === false) return;

    let aftSquares = generateShipCoords([...coords], currentShip.aftSquares, currentShip.direction, -1);
    let foreSquares = generateShipCoords([...coords], currentShip.foreSquares, currentShip.direction, 1);
    let occupiedShipSquares = [[...coords]].concat(aftSquares.concat(foreSquares));
    let obstructions = occupiedShipSquares.some((domCoordInt) => {
      let row = domCoordInt[0];
      let col = domCoordInt[1];
      return board[row][col].isShip === true;
    });

    if (obstructions) {
      return;
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

  return { placeShip, generateShipCoords };
}
