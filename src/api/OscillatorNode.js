"use strict";

const AudioScheduledSourceNode = require("./AudioScheduledSourceNode");
const AudioParam = require("./AudioParam");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class OscillatorNode extends AudioScheduledSourceNode {
  constructor(context, opts = {}) {
    const type = defaults(opts.type, "sine");
    const frequency = defaults(opts.frequency, 440);
    const detune = defaults(opts.detune, 0);
    const periodicWave = defaults(opts.periodicWave, null);
    const $ = toNative(context).createOscillator();

    super($, opts);

    this._frequency = new AudioParam(this.$.frequency, 0, context.sampleRate / 2);
    this._detune = new AudioParam(this.$.detune);

    if (periodicWave !== null) {
      this.setPeriodicWave(periodicWave);
    } else {
      this.$.type = type;
    }
    this.frequency.value = frequency;
    this.detune.value = detune;
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

  setPeriodicWave(periodicWave) {
    this.$.setPeriodicWave(toNative(periodicWave));
  }
}

module.exports = OscillatorNode;
