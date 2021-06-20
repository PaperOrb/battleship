import { useState } from "react";
import Board from "./Board";

export default function ShipPicker({ setPlacingShip }) {
  let togglePlacingShip = () => {
    setPlacingShip((prevPlacingShip) => !prevPlacingShip);
  };

  let drag = (event) => {
    event.dataTransfer.setData("text", event.target.id);
    // Board.setState("blah");
    // prototype drag and dropping 1 square, then replace adjacent tiles with ship tiles. hopefully replacing nodes via vanilla JS doesnt mess up react
    // probably need to get the dropped tile + the destination, input that data into the board state and let the component update itself
  };

  return (
    <div className="ship-picker">
      <div className="ship-container" onClick={togglePlacingShip} onDragStart={drag} draggable="true">
        Carrier
      </div>
      <div className="ship-container" onDragStart={drag} draggable="true">
        Battleship
      </div>
      <div className="ship-container" onDragStart={drag} draggable="true">
        Destroyer
      </div>
      <div className="ship-container" onDragStart={drag} draggable="true">
        Submarine
      </div>
      <div className="ship-container" onDragStart={drag} draggable="true">
        Patrol Boat
      </div>
    </div>
  );
}
