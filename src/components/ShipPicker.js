import { useState, useContext } from "react";
import Board from "./Board";
import { ShipContext } from "../App";

export default function ShipPicker() {
  const { placingShip, setPlacingShip } = useContext(ShipContext);

  // grab the clicked carrier square and drop it into the board on an available square. will need to tweak available squares based on length to left/right of clicked ship sq
  // sets ship object when a ship is dragged/clicked
  let setupShip = (e) => {
    let clickedShipSq = Number(e.target.getAttribute("data-num"));
    let length = Number(e.target.getAttribute("data-length"));

    let sqsAfter = length - clickedShipSq;
    let sqsBefore = clickedShipSq - 1;
    let ship = { name: e.target.id, index: clickedShipSq, squaresBefore: sqsBefore, squaresAfter: sqsAfter };
    setPlacingShip(ship);
  };

  let carrier = () => {
    return (
      <div className="carrier-container" onDragStart={dragShip} draggable="true">
        {[1, 2, 3, 4, 5].map((ele) => {
          return (
            <div
              key={ele}
              id="carrier"
              data-num={ele}
              data-length="5"
              onMouseDown={setupShip}
              className="carrier"
              style={{ grid: `${ele}` }}
            ></div>
          );
        })}
      </div>
    );
  };

  let dragShip = (event) => {
    // console.log(clickedShipSq);
    event.dataTransfer.setData("text", event.target.id);
    // Board.setState("blah");
    // prototype drag and dropping 1 square, then replace adjacent tiles with ship tiles. hopefully replacing nodes via vanilla JS doesnt mess up react
    // probably need to get the dropped tile + the destination, input that data into the board state and let the component update itself
  };

  return <div className="ship-picker">{carrier()}</div>;
}
