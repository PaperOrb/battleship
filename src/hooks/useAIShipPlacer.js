import { useEffect } from "react";

export default function useAIShipPlacer() {
  useEffect(() => {
    let direction = Math.round(Math.random());

    let coordPicker = (index) => {
      let min = 0;
      let max = 6;
      let rowOrCol = Math.floor(Math.random() * (max - min + 1) + min);
      let xyCoord = direction === 0 ? `${rowOrCol}${index}` : `${index}${rowOrCol}`;
      if (Number(rowOrCol[0]) === 0) return xyCoord[1];
      return xyCoord;
    };

    let coordPicker2 = (index) => {
      // requirements list:
      // 1. must pick unpicked row and col (can recursively call random generator like in the bookmarked link)
      // 2. must pick spot so ship isn't OOB (can set max from array of droppable ship spots and call it a day)
      let rowsColsArray = [0, 1, 2, 3, 4, 5, 6];
      let ship
      let min = 0;
      let max = rowsColsArray.length - 1;
      let randEle = Math.floor(Math.random() * (max - min + 1) + min);
      let length = rowsColsArray.length;
      while (length--) {
        rowsColsArray.splice(randEle, 1);
      }
    };

    let shipsArr = ["carrier", "battleship", "destroyer", "submarine", "patrolboat"];

    setTimeout(() => {
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

        let coordz = coordPicker(index);
        console.log(coordz);
        let randomSq = document.getElementById(`cpu-square-${coordz}`);
        if (randomSq === null) console.log(coordz);
        shipEle.dispatchEvent(mouseDown);
        randomSq.dispatchEvent(drop);
      }, 20);
    });
  }, []);
}
