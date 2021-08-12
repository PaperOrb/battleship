// setup aiplacer to call this directly, and dictate control flow based on whether the spot is movable+obstructed

export default function placeShip({ event, board, generateShipCoords, currentShip, setPlacedShips, updateBoard }) {
  event.preventDefault();

  let clickedShipSquareStr = event.target.getAttribute("data-coords");
  let clickedShipSquare = JSON.parse(clickedShipSquareStr);
  let row = clickedShipSquare[0];
  let col = clickedShipSquare[1];
  // console.log(JSON.stringify(currentShip)); // why is this false?

  if (board[row][col].isMovable === false) return;

  let aftSquares = generateShipCoords([...clickedShipSquare], currentShip.aftSquares, currentShip.direction, -1);
  let foreSquares = generateShipCoords([...clickedShipSquare], currentShip.foreSquares, currentShip.direction, 1);
  let occupiedShipSquares = [[...clickedShipSquare]].concat(aftSquares.concat(foreSquares));
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
}
