"use strict";

import AudioWorkerNode from "audio-worker-node";

let AudioContext = global.AudioContext;

if (AudioContext && !AudioContext.prototype.hasOwnProperty("createAudioWorker")) {
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
