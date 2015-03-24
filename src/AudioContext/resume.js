"use strict";

let AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("resume")) {
  //// ### AudioContext.prototype.suspend
  //// Resumes the progression of time in an audio context that has been suspended, which may involve re-priming the frame buffer contents.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `Promise<void>`
  AudioContext.prototype.resume = null;
}
