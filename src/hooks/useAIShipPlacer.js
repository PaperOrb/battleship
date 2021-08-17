import { useEffect, useState } from "react";
import useBoardLogic from "./useBoardLogic";

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
        console.log(shipEle);

        shipEle.dispatchEvent(mouseDown);
      });
    }, 20);
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
        let randX = Math.floor(Math.random() * (max - min + 1) + min);
        let randY = Math.floor(Math.random() * (max - min + 1) + min);

        // add better randomizing logic
        let adjustedCoords = randY === 0 ? randY : `${randY}${randX}`; // first board row has a decimal coord, not base2
        let randomSq = document.getElementById(`cpu-square-${adjustedCoords}`);
        let shipPlaced = placeShip(null, randomSq, currentShip);
        if (shipPlaced) return;
      }
    }

    sleep();
    //eslint-disable-next-line
  }, [currentShip]);
}
