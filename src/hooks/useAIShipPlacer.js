import { useEffect } from "react";

export default function useAIShipPlacer(currentShip, placeShip, ownerProp) {
  useEffect(() => {
    if (ownerProp !== "cpu") return;
    let firstShip = document.getElementById("cpu-carrier");
    let mouseDown = new CustomEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    firstShip.dispatchEvent(mouseDown);

    let shipsArr = ["cpu-battleship", "cpu-destroyer", "cpu-submarine", "cpu-patrolboat"];
    setTimeout(() => {
      shipsArr.forEach((ship, index) => {
        let shipEle = document.getElementById(ship);
        shipEle.dispatchEvent(mouseDown);
      });
    }, 20);
  }, []);

  useEffect(() => {
    if (ownerProp !== "cpu") return;
    if (!currentShip) return;
    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function timeout() {
      return new Promise((resolve) => setTimeout(resolve, 600));
    }

    async function placeShipRandomly() {
      for (;;) {
        await timeout();
        let randX = randInt(0, 6);
        let randY = randInt(0, 6);

        let adjustedCoords = randY === 0 ? randY : `${randY}${randX}`; // first board row has a decimal coord, not base2
        let randomSq = document.getElementById(`cpu-square-${adjustedCoords}`);
        let shipPlaced = placeShip(null, randomSq, currentShip);
        if (shipPlaced) return;
      }
    }

    placeShipRandomly();
    //eslint-disable-next-line
  }, [currentShip]);
}
