import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";
import { ShipContext } from "../../App";
import { renderHook, act } from "@testing-library/react-hooks";

let boardComponent = (ship) => {
  return render(
    <ShipContext.Provider value={{ currentShip: ship }}>
      <Board ownerProp="player" />
    </ShipContext.Provider>
  );
};

describe("drag & drop", () => {
  beforeEach(() => {});

  // test("clicking empty cpu square applies checked-sq class", () => {
  //   let emptyCpuSquare = component.getByTestId("square0"); // square0 refers to square${key} on the board
  //   fireEvent.click(emptyCpuSquare);
  //   expect(emptyCpuSquare.classList).toContain("checked-sq");
  // });

  describe("horizontal carrier by its first square", () => {
    test("onto board[0, 0] is allowed", () => {
      let currentShip = { name: "carrier", index: 1, squaresBefore: 0, squaresAfter: 4 };
      let allowedSq = boardComponent(currentShip).getByTestId("square0");
      fireEvent.drop(allowedSq);
      let result = allowedSq.classList.contains("friendly-sq");
      expect(result).toEqual(true);
    });

    test("onto board[0, 6] is disallowed", () => {
      let currentShip = { name: "carrier", index: 1, squaresBefore: 0, squaresAfter: 4 };
      let allowedSq = boardComponent(currentShip).getByTestId("square6");
      fireEvent.drop(allowedSq);
      let result = allowedSq.classList.contains("friendly-sq");
      expect(result).toEqual(false);
    });
  });

  describe("horizontal carrier by its last square", () => {
    test("onto board[6, 0] is disallowed", () => {
      let currentShip = { name: "carrier", index: 5, squaresBefore: 4, squaresAfter: 0 };
      let allowedSq = boardComponent(currentShip).getByTestId("square60");
      fireEvent.drop(allowedSq);
      let result = allowedSq.classList.contains("friendly-sq");
      expect(result).toEqual(false);
    });

    test("onto board[6, 6] is allowed", () => {
      let currentShip = { name: "carrier", index: 5, squaresBefore: 4, squaresAfter: 0 };
      let allowedSq = boardComponent(currentShip).getByTestId("square66");
      fireEvent.drop(allowedSq);
      let result = allowedSq.classList.contains("friendly-sq");
      expect(result).toEqual(true);
    });
  });
});
