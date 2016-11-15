"use strict";

const AudioScheduledSourceNode = require("./AudioScheduledSourceNode");
const AudioParam = require("./AudioParam");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class DelayNode extends AudioScheduledSourceNode {
  constructor(context, opts = {}) {
    const maxDelayTime = defaults(opts.maxDelayTime, 1);
    const delayTime = defaults(opts.delayTime, 0);
    const $ = toNative(context).createDelay(maxDelayTime);

    super($, opts);

    this._delayTime = new AudioParam(this.$.delayTime);
    this._delayTime.value = delayTime;
  }

  get delayTime() {
    return this._delayTime;
  }
}

module.exports = DelayNode;
