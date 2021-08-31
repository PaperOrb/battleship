import { useEffect, useState } from "react";

export default function ShipPicker({ owner, visibility, placedShips, setPlacedShips, currentShip, setCurrentShip }) {
  const [orientation, setOrientation] = useState("horizontal");

  // applies correct orientation class to ship divs when orientation state changes
  useEffect(() => {
    let prevOrientation = orientation === "vertical" ? "horizontal" : "vertical";
    let ships = document.getElementsByClassName("ship-container");
    let shipPicker = document.getElementById(`${owner}-ship-picker`);

    Array.from(ships).forEach((ship) => {
      ship.classList.remove(`grid-template-${prevOrientation}`);
      ship.classList.add(`grid-template-${orientation}`);
    });
    shipPicker.classList.remove(`grid-template-${orientation}`);
    shipPicker.classList.add(`grid-template-${prevOrientation}`);
    //eslint-disable-next-line
  }, [orientation]);

  let toggleOrientation = () => {
    setOrientation((prevOrientation) => {
      return prevOrientation === "vertical" ? "horizontal" : "vertical";
    });
  };

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
      health: sqsBefore + sqsAfter + 1,
    };

    setCurrentShip(ship);
  };

  let carrier = () => {
    let shipWasPlaced = placedShips.some((ship) => ship.name === `${owner}-carrier`);
    if (shipWasPlaced) return;

    return (
      <div className="ship-container grid-template-horizontal" onDragStart={dragShip} draggable="true">
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
    let shipWasPlaced = placedShips.some((ship) => ship.name === `${owner}-battleship`);
    if (shipWasPlaced) return;

    return (
      <div className="ship-container grid-template-horizontal" onDragStart={dragShip} draggable="true">
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
    let shipWasPlaced = placedShips.some((ship) => ship.name === `${owner}-destroyer`);
    if (shipWasPlaced) return;

    return (
      <div className="ship-container grid-template-horizontal" onDragStart={dragShip} draggable="true">
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
    let shipWasPlaced = placedShips.some((ship) => ship.name === `${owner}-submarine`);
    if (shipWasPlaced) return;

    return (
      <div className="ship-container grid-template-horizontal" onDragStart={dragShip} draggable="true">
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
    let shipWasPlaced = placedShips.some((ship) => ship.name === `${owner}-patrolboat`);
    if (shipWasPlaced) return;

    return (
      <div className="ship-container grid-template-horizontal" onDragStart={dragShip} draggable="true">
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

  return (
    <div className={`${visibility}`}>
      <div id={`${owner}-ship-picker`} className={`ship-picker grid-template-vertical`}>
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
      </div>
    </div>
  );
}
