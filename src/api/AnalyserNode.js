"use strict";

const AudioNode = require("./AudioNode");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class AnalyserNode extends AudioNode {
  constructor(context, opts = {}) {
    const fftSize = defaults(opts.fftSize, 2048);
    const minDecibels = defaults(opts.minDecibels, -100);
    const maxDecibels = defaults(opts.maxDecibels, -30);
    const smoothingTimeConstant = defaults(opts.smoothingTimeConstant, 0.8);
    const $ = toNative(context).createAnalyser();

    super($, opts);

    this.fftSize = fftSize;
    this.minDecibels = minDecibels;
    this.maxDecibels = maxDecibels;
    this.smoothingTimeConstant = smoothingTimeConstant;
  }

  get fftSize() {
    return this.$.fftSize;
  }

  set fftSize(value) {
    this.$.fftSize = value;
  }

  get frequencyBinCount() {
    return this.$.frequencyBinCount;
  }

  get minDecibels() {
    return this.$.minDecibels;
  }

  set minDecibels(value) {
    this.$.minDecibels = value;
  }

  get maxDecibels() {
    return this.$.maxDecibels;
  }

  set maxDecibels(value) {
    this.$.maxDecibels = value;
  }

  get smoothingTimeConstant() {
    return this.$.smoothingTimeConstant;
  }

  set smoothingTimeConstant(value) {
    this.$.smoothingTimeConstant = value;
  }

  getFloatFrequencyData(array) {
    this.$.getFloatFrequencyData(array);
  }

  getByteFrequencyData(array) {
    this.$.getByteFrequencyData(array);
  }

  getFloatTimeDomainData(array) {
    if (this.$.getFloatTimeDomainData) {
      this.$.getFloatTimeDomainData(array);
    } else {
      getFloatTimeDomainData.call(this, array);
    }
  }

  getByteTimeDomainData(array) {
    this.$.getByteTimeDomainData(array);
  }
}

function getFloatTimeDomainData(array) {
  const uint8 = new Uint8Array(array.length);

  this.getByteTimeDomainData(uint8);

  for (let i = 0, imax = array.length; i < imax; i++) {
    array[i] = (uint8 - 128) / 128;
  }
}

module.exports = AnalyserNode;
