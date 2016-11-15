"use strict";

const AudioNode = require("./AudioNode");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class WaveShaperNode extends AudioNode {
  constructor(context, opts = {}) {
    const curve = defaults(opts.curve, null);
    const oversample = defaults(opts.oversample, "none");
    const $ = toNative(context).createWaveShaper();

    super($, opts);

    if (curve !== null) {
      this.$.curve = curve;
    }
    this.$.oversample = oversample;
  }

  get curve() {
    return this.$.curve;
  }

  set curve(value) {
    this.$.curve = value;
  }

  get oversample() {
    return this.$.oversample;
  }

  set oversample(value) {
    this.$.oversample = value;
  }
}

module.exports = WaveShaperNode;
