import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";
import { ShipContext } from "../../App";
import { renderHook, act } from "@testing-library/react-hooks";

const setupBoard = (ship) => {
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
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let occupiedSquares = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq");
      });

      let correctOccupiedSquares = JSON.stringify([true, true, true, true, true, false, false]);
      expect(JSON.stringify(occupiedSquares)).toEqual(correctOccupiedSquares);
    });

    test("onto board[0, 6] is disallowed", () => {
      let currentShip = { name: "carrier", index: 1, squaresBefore: 0, squaresAfter: 4 };
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square6_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });
  });

  describe("horizontal carrier by its last square", () => {
    test("onto board[6, 0] is disallowed", () => {
      let currentShip = { name: "carrier", index: 5, squaresBefore: 4, squaresAfter: 0 };
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square60_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto board[6, 6] is allowed", () => {
      let currentShip = { name: "carrier", index: 5, squaresBefore: 4, squaresAfter: 0 };
      let allowedSq = setupBoard(currentShip).getByTestId(`square66_player`);
      fireEvent.drop(allowedSq);
      let result = allowedSq.classList.contains("friendly-sq");
      expect(result).toEqual(true);
    });
  });
});
