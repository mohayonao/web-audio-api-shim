"use strict";

const AudioScheduledSourceNode = require("./AudioScheduledSourceNode");
const AudioParam = require("./AudioParam");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class GainNode extends AudioScheduledSourceNode {
  constructor(context, opts = {}) {
    const gain = defaults(opts.gain, 1);
    const $ = toNative(context).createGain();

    super($, opts);

    this._gain = new AudioParam(this.$.gain);
    this._gain.value = gain;
  }

  get gain() {
    return this._gain;
  }
}

module.exports = GainNode;
