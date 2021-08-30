import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";
import useAIShipPlacer from "../../hooks/useAIShipPlacer";
import { BoardContext } from "../../App";

jest.mock("../../hooks/useAIShipPlacer");
useAIShipPlacer.mockResolvedValue("blah");

const setupBoard = (ship, owner) => {
  return render(
    <BoardContext.Provider value={{ aisTurn: false, setAisTurn: jest.fn(), declareVictory: jest.fn() }}>
      <Board
        ownerProp={owner}
        visibility={"hide-element"}
        setPlacedShips={jest.fn()}
        currentShip={ship}
        placedShips={[]}
      />
    </BoardContext.Provider>
  );
};

describe("attacking enemy square", () => {
  let currentShip;
  let enemyBoard;
  let sqToAttack;

  beforeEach(() => {
    currentShip = { name: "carrier", index: 5, aftSquares: 0, foreSquares: 4, direction: "horizontal", health: 5 };
    enemyBoard = setupBoard(currentShip, "cpu");
    sqToAttack = enemyBoard.getByTestId("square0_cpu");
  });

  describe("that's empty", () => {
    test("sets color to gray", () => {
      fireEvent.click(sqToAttack);
      expect(sqToAttack.classList.contains("checked-sq")).toEqual(true);
    });
  });

  describe("that has enemy ship", () => {
    test("sets color to red", () => {
      fireEvent.drop(sqToAttack);
      fireEvent.click(sqToAttack);
      expect(sqToAttack.classList.contains("hit-sq")).toEqual(true);
    });
  });
});

describe("drag & drop", () => {
  describe("horizontal carrier by its first square", () => {
    let currentShip;
    let boardComponent;

    beforeEach(() => {
      currentShip = { name: "carrier", index: 5, aftSquares: 0, foreSquares: 4, direction: "horizontal" };
      boardComponent = setupBoard(currentShip, "player");
    });

    test("onto board[0, 0] is allowed", () => {
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([true, true, true, true, true, false, false]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let sqDestination = boardComponent.getByTestId(`square6_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto occupied spot is disallowed", () => {
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
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square60_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square6${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto board[6, 6] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
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
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto board[6, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square66_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let sq = boardComponent.getByTestId(`square6${index}_player`);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto board[0, 3] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
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
      let boardComponent = setupBoard(currentShip, "player");
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
      let boardComponent = setupBoard(currentShip, "player");
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
      let boardComponent = setupBoard(currentShip, "player");
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
      let boardComponent = setupBoard(currentShip, "player");
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
      let boardComponent = setupBoard(currentShip, "player");
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
      let boardComponent = setupBoard(currentShip, "player");
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
      let boardComponent = setupBoard(currentShip, "player");
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

  describe("horizontal battleship by its first square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "battleship", index: 4, aftSquares: 0, foreSquares: 3, direction: "horizontal" };
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let occupiedSpot = boardComponent.getByTestId(`square1_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });

    test("onto board[0, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([true, true, true, true, false, false, false]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
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

  describe("vertical battleship by its last square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "battleship", index: 4, aftSquares: 3, foreSquares: 0, direction: "vertical" };
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let occupiedSpot = boardComponent.getByTestId(`square30_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square40_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });

    test("onto board[6, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square60_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([false, false, false, true, true, true, true]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
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
  describe("horizontal submarine by its first square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "submarine", index: 3, aftSquares: 0, foreSquares: 2, direction: "horizontal" };
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let occupiedSpot = boardComponent.getByTestId(`square2_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square1_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });

    test("onto board[0, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([true, true, true, false, false, false, false]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
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

  describe("vertical submarine by its last square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "submarine", index: 3, aftSquares: 2, foreSquares: 0, direction: "vertical" };
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let occupiedSpot = boardComponent.getByTestId(`square20_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square30_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });

    test("onto board[6, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square60_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([false, false, false, false, true, true, true]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
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

  describe("horizontal destroyer by its first square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "destroyer", index: 3, aftSquares: 0, foreSquares: 2, direction: "horizontal" };
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let occupiedSpot = boardComponent.getByTestId(`square2_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square1_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });

    test("onto board[0, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([true, true, true, false, false, false, false]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
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

  describe("vertical destroyer by its last square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "destroyer", index: 3, aftSquares: 2, foreSquares: 0, direction: "vertical" };
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let occupiedSpot = boardComponent.getByTestId(`square20_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square30_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });

    test("onto board[6, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square60_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([false, false, false, false, true, true, true]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
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

  describe("horizontal patrolboat by its first square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "patrolboat", index: 3, aftSquares: 0, foreSquares: 2, direction: "horizontal" };
    });

    test("onto board[0, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([true, true, true, false, false, false, false]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square6_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let occupiedSpot = boardComponent.getByTestId(`square1_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square0_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });
  });

  describe("vertical patrolboat by its last square", () => {
    let currentShip;
    beforeEach(() => {
      currentShip = { name: "patrolboat", index: 2, aftSquares: 1, foreSquares: 0, direction: "vertical" };
    });

    test("onto board[6, 0] is allowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square60_player`);
      fireEvent.drop(sqDestination);

      let result = [0, 1, 2, 3, 4, 5, 6].map((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq");
      });

      expect(result).toEqual([false, false, false, false, false, true, true]);
    });

    test("onto board[0, 6] is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let sqDestination = boardComponent.getByTestId(`square6_player`);
      fireEvent.drop(sqDestination);

      let noOccupiedSquares = [0, 1, 2, 3, 4, 5, 6].every((index) => {
        let boardPos = index === 0 ? `square${index}_player` : `square${index}0_player`;
        let sq = boardComponent.getByTestId(boardPos);
        return sq.classList.contains("friendly-sq") === false;
      });

      expect(noOccupiedSquares).toEqual(true);
    });

    test("onto occupied spot is disallowed", () => {
      let boardComponent = setupBoard(currentShip, "player");
      let occupiedSpot = boardComponent.getByTestId(`square10_player`);
      fireEvent.drop(occupiedSpot);

      let sqDestination = boardComponent.getByTestId(`square20_player`);
      fireEvent.drop(sqDestination);

      let notPlaced = sqDestination.classList.contains("friendly-sq") === false;

      expect(notPlaced).toEqual(true);
    });
  });
});
