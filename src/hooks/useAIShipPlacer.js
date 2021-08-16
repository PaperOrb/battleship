import { useEffect, useState } from "react";
import useBoardLogic from "./useBoardLogic";

export default function useAIShipPlacer(currentShip, aiPlacedShips, placeShip, ownerProp) {
  useEffect(() => {
    if (ownerProp !== "cpu") return;
    let firstShip = document.getElementById("carrier");
    let mouseDown = new CustomEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    firstShip.dispatchEvent(mouseDown);

    let shipsArr = ["battleship", "destroyer", "submarine", "patrolboat"];

    setTimeout(() => {
      shipsArr.forEach((ship, index) => {
        let shipEle = document.getElementById(ship);
        shipEle.dispatchEvent(mouseDown);
      }, 20);
    });
  }, []);

  useEffect(() => {
    if (ownerProp !== "cpu") return;
    if (!currentShip) return;
    let min = 0;
    let max = 6;

    function timeout() {
      return new Promise((resolve) => setTimeout(resolve, 600));
    }

    async function sleep() {
      for (;;) {
        await timeout();
        let randCoord = Math.floor(Math.random() * (max - min + 1) + min);

        let adjustedCoords = randCoord === 0 ? randCoord : `${randCoord}0`; // first board row has a decimal coord, not base2
        let randomSq = document.getElementById(`cpu-square-${adjustedCoords}`);
        let shipPlaced = placeShip(null, randomSq, currentShip);
        if (shipPlaced) return;
      }
    }

    sleep();
    //eslint-disable-next-line
  }, [currentShip]);
}
