function awaitState(fn) {
  return new Promise((resolve) => setTimeout(fn, 100));
}

function loopState() {
  for (;;) {}
}
