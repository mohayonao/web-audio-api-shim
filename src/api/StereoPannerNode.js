"use strict";

const StereoPannerNodeShim = require("stereo-panner-node");
const AudioNode = require("./AudioNode");
const AudioParam = require("./AudioParam");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class StereoPannerNode extends AudioNode {
  constructor(context, opts = {}) {
    const pan = defaults(opts.pan, 0);
    const $ = toNative(context).createStereoPanner ?
      toNative(context).createStereoPanner() :
      createStereoPanner(toNative(context));

    super($, opts);

    this._pan = new AudioParam(this.$.pan);
    this._pan.value = pan;
  }

  get pan() {
    return this._pan;
  }
}

function createStereoPanner(audioContext) {
  return new StereoPannerNodeShim(audioContext);
}

module.exports = StereoPannerNode;
