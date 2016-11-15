"use strict";

const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class PeriodicWave {
  constructor(context, opts = {}) {
    const real = defaults(opts.real, null);
    const imag = defaults(opts.imag, null);
    const disableNormalization = defaults(opts.disableNormalization, false);
    const $ = toNative(context).createPeriodicWave(real, imag, !disableNormalization);

    this.$ = $;
    $._ = this;
  }
}

module.exports = PeriodicWave;
