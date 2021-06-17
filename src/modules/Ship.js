let ship = (() => {
  let create = (owner, coords) => {
    return {
      owner: owner,
      coords: coords, // e.g, { "03": "unhit", "04": "unhit" }
    };
  };

  return { create };
})();

export default ship;
