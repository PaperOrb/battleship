import { useEffect, useState } from "react";

export default function useAIShipPlacer({ currentShip, aiPlacedShips }) {
  useEffect(() => {
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
    if (!currentShip) return;
    async function sleep() {
      for (;;) {
        if (aiPlacedShips.includes(currentShip)) return;
        let drop;
        let randCoord;
        await new Promise((r) => {
          // I think the reason this loops a limited amount with the timeout and an unlimited amount w/o it is because the loop never gives a chance for the async setCurrentShip to occur.
          drop = new Event("drop", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          let min = 0;
          let max = 2; // the amount of times the loop occurs can't exceed this max. that's because currentShip isn't updated in lockstep with the drop event.
          randCoord = Math.floor(Math.random() * (max - min + 1) + min);

          setTimeout(() => {
            let randomSq = document.getElementById(`cpu-square-${randCoord + 1}0`);
            console.log(aiPlacedShips.includes(currentShip));
            randomSq.dispatchEvent(drop);
          }, 1000);
        });
      }
    }

    sleep();
  }, [aiPlacedShips, currentShip]);
}
