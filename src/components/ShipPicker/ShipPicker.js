import { useContext, useState } from "react";
import { ShipContext } from "../../App";

export default function ShipPicker() {
  const { currentShip, setCurrentShip } = useContext(ShipContext);
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
    return (
      <div className="carrier-container grid-template-columns" onDragStart={dragShip} draggable="true">
        {[1, 2, 3, 4, 5].map((ele) => {
          return (
            <div
              key={ele}
              id="carrier"
              data-num={ele}
              data-length="5"
              onMouseDown={setupShip}
              className="carrier ship"
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
    let carriers = document.getElementsByClassName("carrier-container");
    let shipPicker = document.querySelector(".ship-picker");
    Array.from(carriers).forEach((carrier) => {
      carrier.classList.toggle("grid-template-columns");
      carrier.classList.toggle("grid-template-rows");
    });
    shipPicker.classList.toggle("grid-template-columns");
    shipPicker.classList.toggle("grid-template-rows");
  };

  return (
    <div>
      <div className="ship-picker grid-template-rows">
        {carrier()}
        {carrier()}
      </div>
      <div>
        <button className="orientation-btn" onClick={toggleOrientation}>
          Toggle Orientation
        </button>
      </div>
    </div>
  );
}
