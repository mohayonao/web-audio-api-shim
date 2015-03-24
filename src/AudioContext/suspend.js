"use strict";

let AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("suspend")) {
  //// ### AudioContext.prototype.suspend
  //// Suspends the progression of time in the audio context, allows any current context processing blocks that are already processed to be played to the destination, and then allows the system to release its claim on audio hardware.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<void>`
  AudioContext.prototype.suspend = null;
}
