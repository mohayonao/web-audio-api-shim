"use strict";

const AudioNode = require("./AudioNode");
const AudioParam = require("./AudioParam");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class DynamicsCompressorNode extends AudioNode {
  constructor(context, opts = {}) {
    const threshold = defaults(opts.threshold, -24);
    const knee = defaults(opts.knee, 30);
    const ratio = defaults(opts.ratio, 12);
    const attack = defaults(opts.attack, 0.003);
    const release = defaults(opts.release, 0.25);
    const $ = toNative(context).createDynamicsCompressor();

    super($, opts);

    this._threshold = new AudioParam(this.$.threshold);
    this._knee = new AudioParam(this.$.knee);
    this._ratio = new AudioParam(this.$.ratio);
    this._attack = new AudioParam(this.$.attack);
    this._release = new AudioParam(this.$.release);
    this.$.threshold.value = threshold;
    this.$.knee.value = knee;
    this.$.ratio.value = ratio;
    this.$.attack.value = attack;
    this.$.release.value = release;
  }

  get threshold() {
    return this._threshold;
  }

  get knee() {
    return this._knee;
  }

  get ratio() {
    return this._ratio;
  }

  get reduction() {
    return this.$.reduction;
  }

  get attack() {
    return this._attack;
  }

  get release() {
    return this._release;
  }
}

module.exports = DynamicsCompressorNode;
