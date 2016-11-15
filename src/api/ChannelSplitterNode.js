"use strict";

const AudioNode = require("./AudioNode");
const defaults = require("../utils/defaults");
const toNative = require("../utils/toNative");

class ChannelSplitterNode extends AudioNode {
  constructor(context, opts = {}) {
    const numberOfOutputs = defaults(opts.numberOfOutputs, 6);
    const $ = toNative(context).createChannelSplitter(numberOfOutputs);

    super($, opts);
  }
}

module.exports = ChannelSplitterNode;
