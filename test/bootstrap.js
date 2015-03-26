/* jshint ignore: start */
global.assert = function(value, message) {
  if (!value) {
    throw new Error(message);
  }
};
global.assert.throws = function(block, expected, message) {
  var actual;

  try {
    block();
  } catch (e) {
    actual = e;
  }

  if (actual instanceof expected) {
    return;
  }

  throw new Error(message);
};
global.audioContext = new AudioContext();
global.getShimType = function(func) {
  if (func == null) {
    return "not implemented";
  }
  if (/\[native code\]/.test(func)) {
    if (func.hasOwnProperty("original")) {
      return "not implemented";
    }
    return "native";
  }
  return "shim";
};
/* jshint ignore: end */
