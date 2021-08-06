import { useEffect } from "react";

export default function useAIShipPlacer({ cpuBoard, setCurrentShip, aiPlacedShips, currentShip }) {
  useEffect(() => {
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

      setTimeout(() => {
        let randomSq = document.getElementById(`cpu-square-${index + 1}0`);
        shipEle.dispatchEvent(mouseDown);
        randomSq.dispatchEvent(drop);
      }, 20);
    });
  }, []);
}
