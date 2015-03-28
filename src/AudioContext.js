"use strict";

let AudioContext = global.AudioContext;
let OfflineAudioContext = global.OfflineAudioContext;

function installCreateAudioWorker() {
  if (AudioContext.prototype.hasOwnProperty("createAudioWorker")) {
    return;
  }

  var AudioWorkerNode = require("audio-worker-node");

  //// ### AudioContext.prototype.createAudioWorker
  //// Creates an **`AudioWorkerNode`** and its associated **`AudioWorkerGlobalScope`** for direct audio processing using JavaScript.
  ////
  //// #### Parameters
  //// - `scriptURL: string`
  ////   - This parameter represents the URL of the script to be loaded as an AudioWorker.
  //// - `numberOfInputChannels: number = 2`
  ////   - This parameter determines the number of channels for this node's input.
  //// - `numberOfOutputChannels: number = 2`
  ////   - This parameter determines the number of channels for this node's output.
  ////
  //// #### Return
  //// - `AudioNode as AudioWorkerNode`
  AudioContext.prototype.createAudioWorker = function(scriptURL, numberOfInputChannels, numberOfOutputChannels) {
    return new AudioWorkerNode(this, scriptURL, numberOfInputChannels, numberOfOutputChannels);
  };
}

function installCreateStereoPanner() {
  if (AudioContext.prototype.hasOwnProperty("createStereoPanner")) {
    return;
  }

  var StereoPannerNode = require("stereo-panner-node");

  //// ### AudioContext.prototype.createStereoPanner
  //// Creates a StereoPannerNode.
  ////
  //// #### Parameters
  //// - _none_
  ////
  //// #### Return
  //// - `AudioNode as StereoPannerNode`
  AudioContext.prototype.createStereoPanner = function() {
    return new StereoPannerNode(this);
  };
}

function installDecodeAudioData() {
  let audioContext = new OfflineAudioContext(1, 1, 44100);
  let isPromiseBased = false;

  try {
    let audioData = new Uint8Array(0).buffer;
    let nop = () => {};
    isPromiseBased = !!audioContext.decodeAudioData(audioData, nop);
  } catch (e) {}

  if (isPromiseBased) {
    return;
  }

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

function installClose() {
  if (AudioContext.prototype.hasOwnProperty("close")) {
    return;
  }

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

function installResume() {
  if (AudioContext.prototype.hasOwnProperty("resume")) {
    return;
  }

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

function installSuspend() {
  if (AudioContext.prototype.hasOwnProperty("suspend")) {
    return;
  }

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

export function install(){
  installCreateAudioWorker();
  installCreateStereoPanner();
  installDecodeAudioData();
  installClose();
  installResume();
  installSuspend();
}
