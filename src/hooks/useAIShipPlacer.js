import { useEffect } from "react";

export default function useAIShipPlacer({ cpuBoard, setCurrentShip, aiPlacedShips, currentShip }) {
  useEffect(() => {
    let ship;
    let shipsArr = ["carrier", "battleship", "patrolboat", "destroyer", "submarine"];

    shipsArr.forEach((ship, index) => {
      let shipEle = document.getElementById(ship);
      let mouseDown = new CustomEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      let drop = new Event("drop", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      async function sleepDebugger() {
        while (!aiPlacedShips.includes(ship)) {
          function timer(ms) {
            return new Promise((res) => setTimeout(res, ms));
          }
          let randomSq = document.getElementById(`cpu-square-${index + 1}0`);
          shipEle.dispatchEvent(mouseDown);
          randomSq.dispatchEvent(drop);
          await timer(3000);
        }
      }
      sleepDebugger();
    });
  }, []);
}
