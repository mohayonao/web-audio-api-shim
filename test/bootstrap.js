/* jshint ignore: start */
global.assert = function(value, message) {
  if (!value) {
    throw new Error(message);
  }
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
global.it.unless_on_iOS = function(title, fn) {
  if (/i(Phone|Pad|Pod)/.test(window.navigator.userAgent)) {
    return it.skip("this test cannot be run on iOS", function() {});
  }
  return it(title, fn);
};
/* jshint ignore: end */
