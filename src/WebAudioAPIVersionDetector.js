"use strict";

var AudioContext = global.AudioContext || global.webkitAudioContext;
var OfflineAudioContext = global.OfflineAudioContext || global.webkitOfflineAudioContext;

function detect() {
  if (AudioContext && OfflineAudioContext) {
    if (Object.getPrototypeOf(OfflineAudioContext) === AudioContext) {
      return "v1";
    } else {
      return "v2";
    }
  }
  return "not supported";
}

module.exports = { detect };
