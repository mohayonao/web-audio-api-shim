"use strict";

const AudioNode = require("./AudioNode");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class IIRFilterNode extends AudioNode {
  constructor(context, opts = {}) {
    const feedforward = defaults(opts.feedforward , null);
    const feedback = defaults(opts.feedback , null);
    const $ = toNative(context).createIIRFilter ?
      toNative(context).createIIRFilter(feedforward, feedback) :
      createIIRFilter(toNative(context), feedforward, feedback);

    super($, opts);
  }

  getFrequencyResponse(frequencyHz, magResponse, phaseResponse) {
    this.$.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);
  }
}

function createIIRFilter(audioContext) {
  const filter = audioContext.createBiquadFilter();

  // TODO: apply filter params

  return filter;
}

module.exports = IIRFilterNode;
