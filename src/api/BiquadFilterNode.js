"use strict";

const AudioNode = require("./AudioNode");
const AudioParam = require("./AudioParam");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class BiquadFilterNode extends AudioNode {
  constructor(context, opts = {}) {
    const type = defaults(opts.type, "lowpass");
    const frequency = defaults(opts.frequency, 350);
    const detune = defaults(opts.detune, 0);
    const Q = defaults(opts.Q, 1);
    const gain = defaults(opts.gain, 0);
    const $ = toNative(context).createBiquadFilter();

    super($, opts);

    this._frequency = new AudioParam(this.$.frequency, 0, context.sampleRate / 2);
    this._detune = new AudioParam(this.$.detune);
    this._Q = new AudioParam(this.$.Q);
    this._gain = new AudioParam(this.$.gain);

    this.type = type;
    this.frequency.value = frequency;
    this.detune.value = detune;
    this.Q.value = Q;
    this.gain.value = gain;
  }

  get type() {
    return this.$.type;
  }

  set type(value) {
    this.$.type = value;
  }

  get frequency() {
    return this._frequency;
  }

  get detune() {
    return this._detune;
  }

  get Q() {
    return this._Q;
  }

  get gain() {
    return this._gain;
  }

  getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
    this.$.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);
  }
}

module.exports = BiquadFilterNode;
