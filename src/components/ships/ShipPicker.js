import boardLogic from "../board/BoardLogic";
import { ShipContext } from "../../App";
import { useContext } from "react";

export default function ShipPicker() {
  const { currentShip, setCurrentShip } = useContext(ShipContext);
  const { setupShip, dragShip } = boardLogic(); // have duplicate boardLogic in ShipPicker.js and Board.js.
  // can't move boardLogic up into App though because it relies on board state.
  // solution? brand new approach of testing via props.
  // simulate click on ship picker and expect that currentShip is set. then work from there

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

  return <div className="ship-picker">{carrier()}</div>;
}
