"use strict";

const AudioScheduledSourceNode = require("./AudioScheduledSourceNode");
const AudioParam = require("./AudioParam");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class ConstantSourceNode extends AudioScheduledSourceNode {
  constructor(context, opts = {}) {
    const offset = defaults(opts.offset, 1);
    const $ = toNative(context).createConstantSource ?
      toNative(context).createConstantSource() :
      createConstantSource(toNative(context));

    super($, opts);

    this._offset = new AudioParam(this.$.offset);

    this.offset.value = offset;
  }

  get offset() {
    return this._offset;
  }
}

function createConstantSource(audioContext) {
  const bufSrc = audioContext.createBufferSource();
  const buffer = audioContext.createBuffer(1, 8, audioContext.sampleRate);
  const gain = audioContext.createGain();

  gain.channelCount = 1;
  gain.channelCountMode = "explicit";

  buffer.getChannelData(0).set([ 1, 1, 1, 1, 1, 1, 1, 1 ]);

  bufSrc.buffer = buffer;
  bufSrc.loop = true;
  bufSrc.connect(gain);

  Object.defineProperties(bufSrc, {
    connect: {
      value: gain.connect.bind(gain),
      writable: true, enumerable: true, configurable: true
    },
    disconnect: {
      value: gain.disconnect.bind(gain),
      writable: true, enumerable: true, configurable: true
    },
    offset: {
      get: () => gain.gain,
      enumerable: true, configurable: true
    }
  });

  return bufSrc;
}

module.exports = ConstantSourceNode;
