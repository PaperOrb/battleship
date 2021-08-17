import { useState } from "react";

export default function ShipPicker({ owner, visibility, placedShips, setPlacedShips, currentShip, setCurrentShip }) {
  const [orientation, setOrientation] = useState("horizontal");

  // sets ship object when a ship is dragged/clicked
  let setupShip = (e) => {
    let clickedShipSq = Number(e.target.getAttribute("data-num"));
    let length = Number(e.target.getAttribute("data-length"));

    let sqsAfter = length - clickedShipSq;
    let sqsBefore = clickedShipSq - 1;
    let ship = {
      name: e.target.id,
      index: clickedShipSq,
      aftSquares: sqsBefore,
      foreSquares: sqsAfter,
      direction: orientation,
    };

    setCurrentShip(ship);
  };

  let carrier = () => {
    if (placedShips.includes(`${owner}-carrier`)) return;
    return (
      <div className="ship-container grid-template-columns" onDragStart={dragShip} draggable="true">
        {[1, 2, 3, 4, 5].map((ele) => {
          return (
            <div
              key={ele}
              id={`${owner}-carrier`}
              data-testid={`carrier${ele}`}
              data-num={ele}
              data-length="5"
              onMouseDown={setupShip}
              className="ship"
            ></div>
          );
        })}
      </div>
    );
  };

  let battleship = () => {
    if (placedShips.includes(`${owner}-battleship`)) return;
    return (
      <div className="ship-container grid-template-columns" onDragStart={dragShip} draggable="true">
        {[1, 2, 3, 4].map((ele) => {
          return (
            <div
              key={ele}
              id={`${owner}-battleship`}
              data-testid={`battleship${ele}`}
              data-num={ele}
              data-length="4"
              onMouseDown={setupShip}
              className="ship"
            ></div>
          );
        })}
      </div>
    );
  };

  let destroyer = () => {
    if (placedShips.includes(`${owner}-destroyer`)) return;
    return (
      <div className="ship-container grid-template-columns" onDragStart={dragShip} draggable="true">
        {[1, 2, 3].map((ele) => {
          return (
            <div
              key={ele}
              id={`${owner}-destroyer`}
              data-testid={`destroyer${ele}`}
              data-num={ele}
              data-length="3"
              onMouseDown={setupShip}
              className="ship"
            ></div>
          );
        })}
      </div>
    );
  };

  let submarine = () => {
    if (placedShips.includes(`${owner}-submarine`)) return;
    return (
      <div className="ship-container grid-template-columns" onDragStart={dragShip} draggable="true">
        {[1, 2, 3].map((ele) => {
          return (
            <div
              key={ele}
              id={`${owner}-submarine`}
              data-testid={`submarine${ele}`}
              data-num={ele}
              data-length="3"
              onMouseDown={setupShip}
              className="ship"
            ></div>
          );
        })}
      </div>
    );
  };

  let patrolboat = () => {
    if (placedShips.includes(`${owner}-patrolboat`)) return;
    return (
      <div className="ship-container grid-template-columns" onDragStart={dragShip} draggable="true">
        {[1, 2].map((ele) => {
          return (
            <div
              key={ele}
              id={`${owner}-patrolboat`}
              data-testid={`patrolboat${ele}`}
              data-num={ele}
              data-length="2"
              onMouseDown={setupShip}
              className="ship"
            ></div>
          );
        })}
      </div>
    );
  };

  let dragShip = (event) => {
    event.dataTransfer.setData("ship", JSON.stringify(currentShip));
  };

  let toggleOrientation = () => {
    setOrientation((prevOrientation) => {
      return prevOrientation === "vertical" ? "horizontal" : "vertical";
    });
    let ships = document.getElementsByClassName("ship-container");
    let shipPicker = document.getElementById(`.${owner}ship-picker`);
    Array.from(ships).forEach((ship) => {
      ship.classList.toggle("grid-template-columns");
      ship.classList.toggle("grid-template-rows");
    });
    shipPicker.classList.toggle("grid-template-columns");
    shipPicker.classList.toggle("grid-template-rows");
  };

  // debugging methods
  let showenemyboard = () => {
    setPlacedShips(["carrier", "battleship", "destroyer", "submarine", "patrolboat"]);
  };

  let showPlayerBoard = () => {
    setPlacedShips(["carrier", "battleship", "destroyer", "submarine", "patrolboat"]);
  };
  // end debugging methods

  return (
    <div className={`${visibility}`}>
      <div id={`${owner}-ship-picker`} className={`ship-picker grid-template-rows`}>
        {carrier()}
        {battleship()}
        {destroyer()}
        {submarine()}
        {patrolboat()}
      </div>

      <div>
        <button className="orientation-btn" onClick={toggleOrientation}>
          Toggle Orientation
        </button>
        <button className="orientation-btn" onClick={showenemyboard}>
          begin game
        </button>
        <button className="orientation-btn" onClick={showPlayerBoard}>
          show player board
        </button>
      </div>
    </div>
  );
}
