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
    let connect = AudioNode.prototype.connect;
    let disconnect = AudioNode.prototype.disconnect;
    //// ### AudioNode.prototype.disconnect
    //// Disconnects connections from **`AudioNode`**
    ////
    //// #### Parameters
    //// - _none_
    ////
    //// #### Return
    //// - `void`
    AudioNode.prototype.disconnect = function(...args) {
      this._shim$connections = this._shim$connections || [];

      let cond;

      if (args.length === 0) {
        cond = () => false;
      } else if (args.length === 1 && typeof args[0] === "number") {
        cond = connection => args[0] !== connection[1];
      } else {
        cond = connection => args.some((value, index) => value !== connection[index]);
      }

      let remain = this._shim$connections.filter(cond);

      for (let ch = 0, chmax = this.numberOfOutputs; ch < chmax; ch++) {
        disconnect.call(this, ch);
      }

      remain.forEach((connection) => {
        connect.call(this, connection[0], connection[1], connection[2]);
      });

      this._shim$connections = remain;
    };
    AudioNode.prototype.disconnect.original = disconnect;

    AudioNode.prototype.connect = function(destination, output = 0, input = 0) {
      this._shim$connections = this._shim$connections || [];

      if (destination instanceof AudioNode) {
        connect.call(this, destination, output, input);
      } else {
        connect.call(this, destination, output);
        input = 0;
      }

      this._shim$connections.push([ destination, output, input ]);
    };
    AudioNode.prototype.connect.original = connect;
  }
}
