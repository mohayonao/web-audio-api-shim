"use strict";

const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");
const toShim = require("../utils/toShim");

class AudioNode {
  constructor($, opts = {}) {
    this.$ = $;
    $._ = this;

    const channelCount = defaults(opts.channelCount, $.channelCount);
    const channelCountMode = defaults(opts.channelCountMode, $.channelCountMode);
    const channelInterpretation = defaults(opts.channelInterpretation, $.channelInterpretation);

    this.channelCount = channelCount;
    this.channelCountMode = channelCountMode;
    this.channelInterpretation = channelInterpretation;
  }

  get context() {
    return toShim(this.$.context);
  }

  get numerOfInputs() {
    return this.$.numerOfInputs;
  }

  get numberOfOutputs() {
    return this.$.numberOfOutputs;
  }

  get channelCount() {
    return this.$.channelCount;
  }

  set channelCount(value) {
    this.$.channelCount = value;
  }

  get channelCountMode() {
    return this.$.channelCountMode;
  }

  set channelCountMode(value) {
    this.$.channelCountMode = value;
  }

  get channelInterpretation() {
    return this.$.channelInterpretation;
  }

  set channelInterpretation(value) {
    this.$.channelInterpretation = value;
  }

  connect(...args) {
    this.$.connect(...args.map(toNative));
    if (args[0] instanceof AudioNode) {
      return args[0];
    }
  }

  disconnect(...args) {
    this.$.disconnect(...args.map(toNative));
  }

  addEventListener(type, callback) {
    this.$.addEventListener(type, callback);
  }

  removeEventListener(type, callback) {
    this.$.removeEventListener(type, callback);
  }
}

module.exports = AudioNode;
