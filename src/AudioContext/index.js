"use strict";

global.AudioContext = global.AudioContext || global.webkitAudioContext;
global.OfflineAudioContext = global.OfflineAudioContext || global.webkitOfflineAudioContext;

import "./createStereoPanner";
import "./decodeAudioData";
