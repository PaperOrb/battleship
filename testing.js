let acceptsCb = (cb) => {
  console.log(cb());
};

let outterFunc = () => {
  function callBack() {
    return "called";
  }
  return acceptsCb(callBack);
};

outterFunc();
