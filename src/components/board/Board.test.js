import { render, fireEvent } from "@testing-library/react";
import boardLogic from "./BoardController";
import Board from "./BoardView";
import { ShipContext } from "../../App";

describe("board", () => {
  let component;
  let ship = "";
  const { updateBoard, useSetMovableSquares } = boardLogic;

  // beforeEach(() => {
  //   component = render(
  //     <ShipContext.Provider value={{ currentShip: ship }}>
  //       <Board />
  //     </ShipContext.Provider>
  //   );
  // });

  // test("clicking empty cpu square applies checked-sq class", () => {
  //   let emptyCpuSquare = component.getByTestId("square0"); // square0 refers to square${key} on the board
  //   fireEvent.click(emptyCpuSquare);
  //   expect(emptyCpuSquare.classList).toContain("checked-sq");
  // });

  // test("placing horizontal carrier at far right is disallowed", () => {
  //   let disallowedSq = component.getByTestId("square4");
  //   ship = { name: "carrier", index: 1, squaresBefore: 0, squaresAfter: 4 };
  //   fireEvent.drop(disallowedSq);
  //   let result = disallowedSq.classList.contains("friendly-sq");
  //   expect(result).toEqual(false);
  // });

  test("placing horizontal carrier at far left is allowed", () => {
    ship = { name: "carrier", index: 1, squaresBefore: 0, squaresAfter: 4 };
    useSetMovableSquares(ship, 7, setBoard);

    let component2 = render(
      <ShipContext.Provider value={{ currentShip: ship }}>
        <Board />
      </ShipContext.Provider>
    );

    let disallowedSq = component2.getByTestId("square0");
    fireEvent.drop(disallowedSq);
    console.log(`${disallowedSq.classList}`);
    let result = disallowedSq.classList.contains("friendly-sq");
    expect(result).toEqual(true);
  });

  test.todo("clicking empty cpu square applies checked-sq class");

  test.todo("clicking empty cpu square applies checked-sq class");

  test.todo("clicking empty cpu square applies checked-sq class");
});
