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

    let match = (args, connection) => {
      for (let i = 0, imax = args.length; i < imax; i++) {
        if (args[i] !== connection[i]) {
          return false;
        }
      }
      return true;
    };

    let disconnectAll = (node) => {
      for (let ch = 0, chmax = node.numberOfOutputs; ch < chmax; ch++) {
        disconnect.call(node, ch);
      }
      node._shim$connections = [];
    };

    let disconnectChannel = (node, channel) => {
      disconnect.call(node, channel);
      node._shim$connections = node._shim$connections.filter(connection => connection[1] !== channel);
    };

    let disconnectSelect = (node, args) => {
      let remain = [];
      let hasDestination = false;

      node._shim$connections.forEach((connection) => {
        hasDestination = hasDestination || (args[0] === connection[0]);
        if (!match(args, connection)) {
          remain.push(connection);
        }
      });

      if (!hasDestination) {
        throw new Error("Failed to execute 'disconnect' on 'AudioNode': the given destination is not connected.");
      }

      disconnectAll(node);

      remain.forEach((connection) => {
        connect.call(node, connection[0], connection[1], connection[2]);
      });

      node._shim$connections = remain;
    };

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

      if (args.length === 0) {
        disconnectAll(this);
      } else if (args.length === 1 && typeof args[0] === "number") {
        disconnectChannel(this, args[0]);
      } else {
        disconnectSelect(this, args);
      }
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
