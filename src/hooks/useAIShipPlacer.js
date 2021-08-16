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

    // let shipsArr = ["battleship", "destroyer", "submarine", "patrolboat"];

    // setTimeout(() => {
    //   shipsArr.forEach((ship, index) => {
    //     let shipEle = document.getElementById(ship);
    //     shipEle.dispatchEvent(mouseDown);
    //   }, 20);
    // });
  }, []);

  useEffect(() => {
    if (ownerProp !== "cpu") return;
    if (!currentShip) return;
    let min = 0;
    let max = 6;

    async function sleep() {
      // stop this loop using a promise?
      // if not, does the loop wait for setTimeout or does the loop overflow the callstack so the settimeout never executes its payload?
      // barring the above, split placeShip into 2 separate functions: validateCoords and placeShip. validateCoords can be synchronous and used to load an array of valid coords. the valid coords array is then used in a batch setState call?
      for (;;) {
        console.log("looped");

        await new Promise((r) => {
          // both the await AND settimeout are needed to prevent an infinite loop. i'll have to explain why later when this is done and i have clear answers. for now, add more ships now that carrier is successfully added
          let randCoord = Math.floor(Math.random() * (max - min + 1) + min);

          setTimeout(() => {
            let adjustedCoords = randCoord === 0 ? randCoord : `${randCoord}0`; // first board row has a decimal coord, not base2
            let randomSq = document.getElementById(`cpu-square-${adjustedCoords}`);
            let shipPlaced = placeShip(null, randomSq, currentShip);
            if (shipPlaced) return;
          }, 20);
        });
      }
    }

    sleep();
    //eslint-disable-next-line
  }, [currentShip]);
}
