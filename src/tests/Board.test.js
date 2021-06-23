import { render, fireEvent } from "@testing-library/react";
import Board from "../components/Board";
import { ShipContext } from "../App";

describe("board", () => {
  let component;

  beforeEach(() => {
    component = render(
      <ShipContext.Provider value={{ currentShip: "asdf" }}>
        <Board />
      </ShipContext.Provider>
    );
    // ({ result } = renderHook(() => useBoard(2, "cpu")));
    // result = renderHook(() => useBoard(2, "cpu")).result;
  });

  test("clicking empty cpu square applies checked-sq class", () => {
    let emtpyCpuSquare = component.getByTestId("square0");

    fireEvent.click(emtpyCpuSquare);

    expect(emtpyCpuSquare.classList).toContain("checked-sq");
  });

  test.todo("clicking empty cpu square applies checked-sq class");

  test.todo("clicking empty cpu square applies checked-sq class");

  test.todo("clicking empty cpu square applies checked-sq class");

  test.todo("clicking empty cpu square applies checked-sq class");

  test.todo("clicking empty cpu square applies checked-sq class");
});
