"use strict";

let AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("close")) {
  //// ### AudioContext.prototype.close
  //// Closes the audio context, releasing any system audio resources used by the **`AudioContext`**.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<void>`
  AudioContext.prototype.close = null;
}
