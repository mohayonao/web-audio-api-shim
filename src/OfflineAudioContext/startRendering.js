"use strict";

let OfflineAudioContext = global.OfflineAudioContext;

if (OfflineAudioContext) {
  let audioContext = new OfflineAudioContext(1, 1, 44100);
  let isPromiseBased = false;

  try {
    isPromiseBased = !!audioContext.startRendering();
  } catch (e) {}

  if (!isPromiseBased) {
    let startRendering = OfflineAudioContext.prototype.startRendering;

    //// ### OfflineAudioContext.prototype.startRendering
    //// Given the current connections and scheduled changes, starts rendering audio.
    ////
    //// #### Parameters
    //// - _none_
    ////
    //// #### Return
    //// - `Promise<AudioBuffer>`
    OfflineAudioContext.prototype.startRendering = function() {
      return new Promise((resolve) => {
        let oncomplete = this.oncomplete;
        this.oncomplete = (e) => {
          resolve(e.renderedBuffer);
          if (typeof oncomplete === "function") {
            oncomplete.call(this, e);
          }
        };
        startRendering.call(this);
      });
    };
    OfflineAudioContext.prototype.startRendering.original = startRendering;
  }
}
