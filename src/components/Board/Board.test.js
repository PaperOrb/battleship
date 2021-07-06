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
  describe("horizontal carrier by its first square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "carrier", index: 1, aftSquares: 0, foreSquares: 4, direction: "horizontal" };
    });

    test("onto board[0, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([true, true, true, true, true, false, false]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square6_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip);
      let occupiedSpot = boardComponent.getByTestId(`square1_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });
  });

  describe("horizontal carrier by its last square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "carrier", index: 5, aftSquares: 4, foreSquares: 0, direction: "horizontal" };
    });

    test("onto board[6, 0] is disallowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square60_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square6${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto board[6, 6] is allowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square66_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let sq = boardComponent.getByTestId(`square6${index}_player`);
        return sq.classList.contains("friendly-sq") === true;
      });

      expect(result).toEqual([false, false, true, true, true, true, true]);
    });
  });

  describe("horizontal carrier by its middle square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "carrier", index: 3, aftSquares: 2, foreSquares: 2, direction: "horizontal" };
    });

    test("onto board[0, 0] is disallowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto board[6, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square66_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square6${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto board[0, 3] is allowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square3_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq") === true;
      });

      expect(result).toEqual([false, true, true, true, true, true, false]);
    });
  });

  describe("vertical carrier by its first square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "carrier", index: 1, aftSquares: 0, foreSquares: 4, direction: "vertical" };
    });

    test("onto board[0, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([true, true, true, true, true, false, false]);
    });

    test("onto board[6, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square66_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip);
      let occupiedSpot = boardComponent.getByTestId(`square10_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });
  });

  describe("vertical carrier by its middle square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "carrier", index: 3, aftSquares: 2, foreSquares: 2, direction: "vertical" };
    });

    test("onto board[3, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square30_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([false, true, true, true, true, true, false]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square6_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });
  });

  describe("vertical carrier by its last square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "carrier", index: 5, aftSquares: 4, foreSquares: 0, direction: "vertical" };
    });

    test("onto board[6, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square60_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([false, false, true, true, true, true, true]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip);
      let sqDestination = boardComponent.getByTestId(`square6_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });
  });
});
