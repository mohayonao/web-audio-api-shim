"use strict";

const AudioNode = require("./AudioNode");
const toNative = require("../utils/toNative");

class MediaStreamAudioDestinationNode extends AudioNode {
  constructor(context, opts = {}) {
    const $ = toNative(context).createMediaStreamDestination();

    super($, opts);
  }
}

module.exports = MediaStreamAudioDestinationNode;
