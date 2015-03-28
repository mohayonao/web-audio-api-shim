"use strict";

export function install() {
  if (!global.hasOwnProperty("AudioContext") && global.hasOwnProperty("webkitAudioContext")) {
    global.AudioContext = global.webkitAudioContext;
  }
  if (!global.hasOwnProperty("OfflineAudioContext") && global.hasOwnProperty("webkitOfflineAudioContext")) {
    global.OfflineAudioContext = global.webkitOfflineAudioContext;
  }

  if (!global.AudioContext) {
    return;
  }

  require("./AnalyserNode").install();
  require("./AudioBuffer").install();
  require("./AudioContext").install();
  require("./AudioNode").install();
  require("./OfflineAudioContext").install();
}
