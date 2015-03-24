"use strict";

let OfflineAudioContext = global.OfflineAudioContext;
let AudioNode = global.AudioNode;

if (OfflineAudioContext) {
  let audioContext = new OfflineAudioContext(1, 1, 44100);
  let isSelectiveDisconnection = false;

  try {
    audioContext.createGain().disconnect(audioContext.destination);
  } catch (e) {
    isSelectiveDisconnection = true;
  }

  if (!isSelectiveDisconnection) {
    let disconnect = AudioNode.prototype.disconnect;
    //// ### AudioNode.prototype.disconnect
    //// Disconnects connections from **`AudioNode`**
    ////
    //// #### Parameters
    //// - _none_
    ////
    //// #### Return
    //// - `void`
    AudioNode.prototype.disconnect = disconnect;
    AudioNode.prototype.disconnect.original = null;
  }
}
