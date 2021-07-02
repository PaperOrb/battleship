import { useContext } from "react";
import { ShipContext } from "../../App";

export default function ShipPicker() {
  const { currentShip, setCurrentShip } = useContext(ShipContext);

  // sets ship object when a ship is dragged/clicked
  let setupShip = (e) => {
    let clickedShipSq = Number(e.target.getAttribute("data-num"));
    let length = Number(e.target.getAttribute("data-length"));

    let sqsAfter = length - clickedShipSq;
    let sqsBefore = clickedShipSq - 1;
    let ship = { name: e.target.id, index: clickedShipSq, squaresBefore: sqsBefore, squaresAfter: sqsAfter };
    setCurrentShip(ship);
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
    event.dataTransfer.setData("ship", JSON.stringify(currentShip));
  };

  return <div className="ship-picker">{carrier()}</div>;
}
