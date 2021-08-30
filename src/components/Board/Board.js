import { useEffect, useState, useContext } from "react";
import useBoardLogic from "../../hooks/useBoardLogic";
import { BoardContext } from "../../App";
import useAIShipPlacer from "../../hooks/useAIShipPlacer";

export default function Board({ ownerProp, visibility, setPlacedShips, currentShip, placedShips }) {
  const { aisTurn, setAisTurn, declareVictory } = useContext(BoardContext);
  const [playersTurn, setPlayersTurn] = useState(true);
  const [boardSize] = useState(7);
  const [board, setBoard] = useState(createBoard(boardSize));
  let { placeShip, updateBoard } = useBoardLogic(board, setBoard, setPlacedShips);

  // check for victory
  useEffect(() => {
    let allShipsSunk = placedShips.every((ship) => {
      return ship.health === 0;
    });
    if (allShipsSunk && placedShips.length === 5) {
      let victor = ownerProp === "cpu" ? "You" : "CPU Player";
      let winMsg = `${victor} won!`;
      declareVictory(winMsg);
    }
    //eslint-disable-next-line
  }, [board]);

  // AIs turn is set after playersTurn ends
  useEffect(() => {
    setAisTurn(true);
    setPlayersTurn(false);
  }, [playersTurn]);

  // AI attacks after AI turn is set
  useEffect(() => {
    if (aisTurn === true && ownerProp === "player") {
      attackSq();
    }

    setAisTurn(false);
    setPlayersTurn(true);
    //eslint-disable-next-line
  }, [aisTurn]);

  // setup AI board
  useAIShipPlacer(currentShip, placeShip, ownerProp);

  // set movable squares when a ship is selected
  useEffect(() => {
    let sqIsMovable = (boardEle) => {
      let foreMostShipSquare;
      let aftMostShipSquare;
      if (currentShip.direction === "horizontal") {
        foreMostShipSquare = boardEle.coords[1] + currentShip.foreSquares;
        aftMostShipSquare = boardEle.coords[1] - currentShip.aftSquares;
      } else {
        foreMostShipSquare = boardEle.coords[0] + currentShip.foreSquares;
        aftMostShipSquare = boardEle.coords[0] - currentShip.aftSquares;
      }

      if (foreMostShipSquare < boardSize && aftMostShipSquare > -1) {
        boardEle.isMovable = true;
      } else {
        boardEle.isMovable = false;
      }
      return boardEle;
    };

    updateBoard(sqIsMovable);
    //eslint-disable-next-line
  }, [currentShip, boardSize]);

  function createBoard(size) {
    let arr = Array(size).fill(Array(size).fill(""));

    let arrWithCoords = arr.map((row, row_ind) => {
      return row.map((element, col_ind) => {
        return {
          owner: ownerProp,
          isShip: false,
          isHit: false,
          coords: [row_ind, col_ind],
          isChecked: false,
          shipObj: null,
        };
      });
    });

    return arrWithCoords;
  }

  // filters squares from updateBoard until the clicked square is found, and then updates said sq. then calls next turn
  let updateSquare = (boardEle, domCoords) => {
    if (JSON.stringify(boardEle.coords) !== domCoords) return boardEle; // prevents updating board elements that weren't clicked
    if (boardEle.isHit || boardEle.isChecked) return boardEle; // do nothing if player clicks previously clicked square

    if (boardEle.isShip === true) {
      boardEle.isHit = true;
      boardEle.shipObj.health -= 1;
    } else {
      boardEle.isChecked = true;
    }

    if (ownerProp === "cpu") {
      setPlayersTurn(false); // move was made against CPU board, so now it's AIs turn against player board
    } else {
      setAisTurn(true);
    }

    return boardEle;
  };

  function attackSq(event = null) {
    let coords;

    if (event === null) {
      coords = findEmptyPlayerSq();
    } else {
      coords = event.target.getAttribute("data-coords");
    }

    updateBoard(updateSquare, coords);
  }

  let findEmptyPlayerSq = () => {
    let flatBoard = board.flat();

    // grab flat array of coords for unhit, unchecked spots
    let availableCoords = flatBoard.flatMap((sq) => {
      if (!sq.isHit && !sq.isChecked) return [[sq.coords]];
      return [];
    });

    let randomIndex = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    let index = randomIndex(0, availableCoords.length - 1);
    return JSON.stringify(availableCoords[index].flat());
  };

  let renderSquare = (sq, key) => {
    let clickHandler;
    let nullAIShipCoords = null;
    let squareClass = "board-square empty-sq"; // squares default to empty

    if (sq.isHit) {
      squareClass = "board-square hit-sq"; // square contains a hit ship
    } else if (sq.isShip) {
      squareClass = "board-square friendly-sq"; // square contains a friendly ship
    } else if (sq.isChecked) {
      squareClass = "board-square checked-sq"; // square has been checked
    }

    if (sq.owner !== "player") clickHandler = attackSq;

    return (
      <div
        key={key}
        id={`${ownerProp}-square-${key}`}
        data-testid={`square${key}_${ownerProp}`}
        className={squareClass}
        onClick={clickHandler}
        data-coords={JSON.stringify(sq.coords)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(event) => placeShip(event, nullAIShipCoords, currentShip)}
      ></div>
    );
  };

  let renderBoard = () => {
    let boardJSX = board.map((row, row_ind) => {
      return row.map((sq, sq_ind) => {
        let key = Number(`${String(row_ind) + String(sq_ind)}`); // row is tens place and sq is ones place
        return renderSquare(sq, key);
      });
    });

    return boardJSX;
  };

  return (
    <div key={5} className={`board ${visibility}`} id={`${ownerProp}-board`}>
      {renderBoard()}
    </div>
  );
}
