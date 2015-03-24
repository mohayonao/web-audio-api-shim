"use strict";

if (!global.hasOwnProperty("AudioContext") && global.hasOwnProperty("webkitAudioContext")) {
  global.AudioContext = global.webkitAudioContext;
}
if (!global.hasOwnProperty("OfflineAudioContext") && global.hasOwnProperty("webkitOfflineAudioContext")) {
  global.OfflineAudioContext = global.webkitOfflineAudioContext;
}

import "./close";
import "./createAudioWorker";
import "./createStereoPanner";
import "./decodeAudioData";
import "./resume";
import "./suspend";
