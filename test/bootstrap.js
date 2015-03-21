/* jshint ignore: start */
global.assert = function(value, message) {
  if (!value) {
    throw new Error(message);
  }
};
global.audioContext = new AudioContext();
/* jshint ignore: end */
