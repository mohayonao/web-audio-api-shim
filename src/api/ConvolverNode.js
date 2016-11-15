"use strict";

const AudioNode = require("./AudioNode");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");
const toShim = require("../utils/toShim");

class ConvolverNode extends AudioNode {
  constructor(context, opts = {}) {
    const buffer = defaults(opts.buffer, null);
    const disableNormalization = defaults(opts.disableNormalization, false);
    const $ = toNative(context).createConvolver();

    super($, opts);

    if (buffer !== null) {
      this.buffer = buffer;
    }
    this.normalize = !disableNormalization;
  }

  get buffer() {
    return toShim(this.$.buffer);
  }

  set buffer(value) {
    this.$.buffer = toNative(value);
  }

  get normalize() {
    return this.$.normalize;
  }

  set normalize(value) {
    this.$.normalize = value;
  }
}

module.exports = ConvolverNode;
