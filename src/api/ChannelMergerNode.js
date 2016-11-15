"use strict";

const AudioNode = require("./AudioNode");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class ChannelMergerNode extends AudioNode {
  constructor(context, opts = {}) {
    const numberOfInputs = defaults(opts.numberOfInputs, 6);
    const $ = toNative(context).createChannelMerger(numberOfInputs);

    super($, opts);
  }
}

module.exports = ChannelMergerNode;
