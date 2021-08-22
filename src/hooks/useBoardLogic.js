export default function useBoardLogic(board, setBoard, setPlacedShips) {
  let aiPerformAttack = () => {
    let randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    let coords = [randomInt(0, 6), randomInt(0, 6)];
    let divToAttack = document.getElementById(coords);
    // findDivToAtatck
    // sets board state
  };

  let findDivToAtatck = () => {
    board.forEach((ele) => {
      console.log(ele);
    });
  };

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

    let aftSquares = generateOccupiedCoords([...coords], currentShip.aftSquares, currentShip.direction, -1);
    let foreSquares = generateOccupiedCoords([...coords], currentShip.foreSquares, currentShip.direction, 1);
    let occupiedShipSquares = [[...coords]].concat(aftSquares.concat(foreSquares));
    let obstructions = occupiedShipSquares.some((domCoordInt) => {
      let row = domCoordInt[0];
      let col = domCoordInt[1];
      // out of bounds coords produce a type error, in which case this try block stops execution by saying there's an obstruction
      try {
        return board[row][col].isShip === true;
      } catch (err) {
        return true;
      }
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

  let generateOccupiedCoords = (copyOfClickedShipSq, squaresCount, shipDirection, aftOrForeSquares) => {
    let direction = shipDirection === "horizontal" ? 1 : 0;
    let occupiedSquares = [];
    for (; squaresCount > 0; --squaresCount) {
      copyOfClickedShipSq[direction] += aftOrForeSquares;
      occupiedSquares.push([...copyOfClickedShipSq]);
    }
    return occupiedSquares;
  };

  return { placeShip, updateBoard, aiPerformAttack };
}
