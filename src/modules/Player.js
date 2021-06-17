// const Player = (() => {
//   // private
//   let destroyProtocol = (board) => {};

//   let pickEvenIndex = (arrLength) => {
//     let randIndex;
//     while (randIndex % 2 !== 0) {
//       randIndex = Math.floor(Math.random() * arrLength);
//     }
//     return randIndex;
//   };

//   //call board.uncheckedSpots and then return a random spot
//   let seekProtocol = (uncheckedSpotCoords) => {
//     let xIndex = pickEvenIndex(uncheckedSpotCoords.length);
//     let yIndex = xIndex + 1;
//     // console.log([xIndex, yIndex]);
//     return [uncheckedSpotCoords[xIndex], uncheckedSpotCoords[yIndex]];
//   };

//   //public
//   let create = (playerType) => {
//     return {
//       destroyProtocol: destroyProtocol,
//       seekProtocol: seekProtocol,
//     };
//   };

//   return { create };
// })();

// export default Player;
