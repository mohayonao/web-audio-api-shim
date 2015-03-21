"use strict";

let OfflineAudioContext = global.OfflineAudioContext;
let audioContext = new OfflineAudioContext(1, 1, 44100);
let isPromiseBased = false;

try {
  let audioData = new Uint8Array(0).buffer;
  let nop = () => {};
  isPromiseBased = !!audioContext.decodeAudioData(audioData, nop);
} catch (e) {}

if (!isPromiseBased) {
  let AudioContext = global.AudioContext;
  let decodeAudioData = AudioContext.prototype.decodeAudioData;

  //// ### AudioContext.prototype.decodeAudioData
  //// Asynchronously decodes the audio file data contained in the ArrayBuffer.
  ////
  //// #### Parameters
  //// - `audioData: ArrayBuffer`
  ////   - An ArrayBuffer containing compressed audio data
  //// - `successCallback: function = null`
  ////   - A callback function which will be invoked when the decoding is finished.
  //// - `errorCallback: function = null`
  ////   - A callback function which will be invoked if there is an error decoding the audio file.
  ////
  //// #### Return
  //// - `Promise<AudioBuffer>`
  AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
    return new Promise((resolve, reject) => {
      return decodeAudioData.call(this, audioData, resolve, reject);
    }).then(successCallback, errorCallback);
  };
  AudioContext.prototype.decodeAudioData.original = decodeAudioData;
}
