"use strict";

global.AudioContext = global.AudioContext || global.webkitAudioContext;
global.OfflineAudioContext = global.OfflineAudioContext || global.webkitOfflineAudioContext;

import "./createAudioWorker";
import "./createStereoPanner";
import "./decodeAudioData";
